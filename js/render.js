import {
  googlePlace,
  googleDirections,
  naverSearch,
  naverRoute,
  flightStatusUrl,
} from "./maps.js";
import { isVisited, toggleVisited } from "./state.js";

const CATEGORY = {
  food: "🍜",
  cafe: "☕",
  shopping: "🛍️",
  sight: "📸",
  activity: "🎯",
  transport: "🚆",
};
const PRIORITY = {
  must: { label: "꼭", cls: "p-must" },
  want: { label: "가고싶음", cls: "p-want" },
  maybe: { label: "여유되면", cls: "p-maybe" },
};

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const fmtDate = (iso) => {
  const d = new Date(iso + "T00:00");
  const wd = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${wd})`;
};

const fmtTime = (iso) => {
  const t = new Date(iso);
  if (isNaN(t) || iso.endsWith("T00:00")) return "TODO";
  return new Intl.DateTimeFormat("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }).format(t);
};

// 링크 버튼. naver=true면 앱 딥링크 + 웹 폴백.
function linkBtn(text, href, { naver = false, fallback = "" } = {}) {
  const a = el("a", "btn" + (naver ? " btn-naver" : ""), text);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener";
  if (naver && fallback) a.dataset.nfallback = fallback;
  return a;
}

/* ---------- 항공편 ---------- */

function renderFlights(trip) {
  const sec = el("section", "card");
  sec.id = "flights";
  sec.append(el("h2", null, "✈️ 항공편"));

  trip.flights.forEach((f) => {
    const box = el("div", "flight");
    const heading = f.kind === "outbound" ? "가는 편" : "오는 편";
    box.append(el("div", "flight-head", `<strong>${heading}</strong> · ${fmtDate(f.date)}`));
    box.append(
      el(
        "div",
        "flight-route",
        `${f.depart.airport} <span class="muted">${f.depart.terminal}</span> ${fmtTime(f.depart.time)}
         <span class="arrow">→</span>
         ${f.arrive.airport} <span class="muted">${f.arrive.terminal}</span> ${fmtTime(f.arrive.time)}`
      )
    );
    box.append(el("div", "muted small", `${f.airline} ${f.flightNo} · 예약번호 ${f.bookingRef}`));

    const btns = el("div", "btn-row");
    if (f.kind === "outbound") {
      // 한국 → 인천공항: 네이버 길찾기
      btns.append(
        linkBtn("공항 길찾기 (네이버)", naverRoute({ from: trip.home.coords, to: f.depart.coords, toName: f.depart.name }), {
          naver: true,
          fallback: naverSearch(f.depart.name),
        })
      );
      btns.append(linkBtn("공항 지도 (네이버)", naverSearch(f.depart.name)));
    } else {
      // 숙소 → 나리타공항: 구글 길찾기
      btns.append(
        linkBtn(
          "공항 길찾기 (구글)",
          googleDirections({
            origin: trip.accommodation.coords || trip.accommodation.address,
            destination: f.depart.coords,
            mode: "transit",
          })
        )
      );
      btns.append(linkBtn("공항 지도 (구글)", googlePlace(f.depart.coords, f.depart.name)));
      // 도착 후 한국 이동
      btns.append(
        linkBtn("집 가는 길 (네이버)", naverRoute({ from: f.arrive.coords, to: trip.home.coords, toName: trip.home.name }), {
          naver: true,
          fallback: naverSearch(f.arrive.name),
        })
      );
    }
    btns.append(linkBtn("실시간 운항", flightStatusUrl(f.airline, f.flightNo)));
    box.append(btns);
    sec.append(box);
  });

  return sec;
}

/* ---------- 숙소 ---------- */

function renderStay(trip) {
  const a = trip.accommodation;
  const sec = el("section", "card");
  sec.id = "stay";
  sec.append(el("h2", null, "🏠 숙소"));
  sec.append(el("div", null, `<strong>${a.name}</strong> · ${a.area}`));
  sec.append(el("div", "muted small", a.address));
  sec.append(
    el(
      "div",
      "muted small",
      `체크인 ${fmtDate(a.checkIn.slice(0, 10))} ${fmtTime(a.checkIn)} · 체크아웃 ${fmtDate(a.checkOut.slice(0, 10))} ${fmtTime(a.checkOut)}`
    )
  );
  if (a.notes) sec.append(el("div", "small note", a.notes));

  const btns = el("div", "btn-row");
  btns.append(linkBtn("숙소 지도 (구글)", googlePlace(a.coords, a.address)));
  btns.append(
    linkBtn("숙소 길찾기 (구글)", googleDirections({ destination: a.coords || a.address, mode: "transit" }))
  );
  if (a.url && !a.url.startsWith("TODO")) btns.append(linkBtn("예약 확인", a.url));
  sec.append(btns);
  return sec;
}

/* ---------- 참고 링크 ---------- */

function renderLinks(trip) {
  if (!trip.links || !trip.links.length) return null;
  const sec = el("section", "card");
  sec.append(el("h2", null, "🔗 참고 링크"));
  const row = el("div", "btn-row");
  trip.links.forEach((l) => row.append(linkBtn(`${l.icon || "🔗"} ${l.label}`, l.url)));
  sec.append(row);
  return sec;
}

/* ---------- 일자별 계획 ---------- */

function placeRow(day, area, place) {
  const row = el("div", "place");
  const key = `${day.date}|${area.name}|${place.name}`;
  if (isVisited(key)) row.classList.add("visited");

  const check = el("button", "check", isVisited(key) ? "✓" : "");
  check.title = "가봤음 표시";
  check.addEventListener("click", () => {
    const now = toggleVisited(key);
    row.classList.toggle("visited", now);
    check.textContent = now ? "✓" : "";
  });

  const p = PRIORITY[place.priority] || PRIORITY.maybe;
  const main = el("div", "place-main");
  main.append(
    el(
      "div",
      "place-name",
      `${CATEGORY[place.category] || "📍"} ${place.name} <span class="pill ${p.cls}">${p.label}</span>`
    )
  );
  if (place.note) main.append(el("div", "muted small", place.note));

  const btns = el("div", "btn-row");
  btns.append(linkBtn("지도", googlePlace(place.coords, place.name)));
  btns.append(
    linkBtn("길찾기", googleDirections({ destination: place.coords || place.name, mode: "walking" }))
  );
  main.append(btns);

  row.dataset.priority = place.priority;
  row.append(check, main);
  return row;
}

function renderDay(trip, day, open) {
  const d = el("details", "card day");
  if (open) d.open = true;
  const s = el("summary");
  s.innerHTML = `<span class="day-date">${fmtDate(day.date)}</span> <span class="day-title">${day.title}</span>`;
  d.append(s);

  // 고정 일정(항공/체크인·아웃) 자동 표시
  const anchors = [];
  trip.flights.forEach((f) => {
    if (f.date === day.date) {
      const t = f.kind === "outbound" ? `${f.depart.airport} 출발` : `${f.arrive.airport} 도착`;
      anchors.push(`✈️ ${fmtTime(f.kind === "outbound" ? f.depart.time : f.arrive.time)} ${t} · <a href="#flights">항공편</a>`);
    }
  });
  if (trip.accommodation.checkIn.startsWith(day.date))
    anchors.push(`🔑 ${fmtTime(trip.accommodation.checkIn)} 체크인 · <a href="#stay">숙소</a>`);
  if (trip.accommodation.checkOut.startsWith(day.date))
    anchors.push(`🧳 ${fmtTime(trip.accommodation.checkOut)} 체크아웃 · <a href="#stay">숙소</a>`);
  if (anchors.length) d.append(el("div", "anchors small", anchors.join("<br>")));

  if (day.note) d.append(el("div", "note small", day.note));

  day.areas.forEach((area) => {
    const box = el("div", "area");
    const head = el("div", "area-head");
    head.append(el("span", "area-name", area.name));
    head.append(linkBtn("지역 지도", googlePlace(area.coords, area.name)));
    box.append(head);
    if (area.note) box.append(el("div", "muted small", area.note));
    area.places.forEach((pl) => box.append(placeRow(day, area, pl)));
    d.append(box);
  });

  if (!day.areas.length) d.append(el("div", "muted small", "계획 미정 — 자유롭게 채워보세요."));
  return d;
}

/* ---------- 우선순위 필터 ---------- */

function renderFilter(root) {
  const bar = el("div", "filter");
  const opts = [
    ["all", "전체"],
    ["must", "꼭"],
    ["want", "가고싶음"],
    ["maybe", "여유되면"],
  ];
  opts.forEach(([val, label], i) => {
    const b = el("button", "chip" + (i === 0 ? " on" : ""), label);
    b.addEventListener("click", () => {
      bar.querySelectorAll(".chip").forEach((c) => c.classList.remove("on"));
      b.classList.add("on");
      root.querySelectorAll(".place").forEach((p) => {
        p.hidden = val !== "all" && p.dataset.priority !== val;
      });
    });
    bar.append(b);
  });
  return bar;
}

export function renderTrip(trip, root) {
  root.innerHTML = "";
  const header = el("header", "hero");
  header.append(el("h1", null, trip.title));
  header.append(el("div", "muted", trip.subtitle));
  root.append(header);

  root.append(renderFlights(trip));
  root.append(renderStay(trip));
  const links = renderLinks(trip);
  if (links) root.append(links);

  const plan = el("section", null, "");
  plan.append(el("h2", "plan-title", "🗓️ 일정"));
  plan.append(renderFilter(plan));
  const today = new Date().toISOString().slice(0, 10);
  trip.days.forEach((day, i) => {
    const open = day.date === today || (today < trip.days[0].date && i === 0);
    plan.append(renderDay(trip, day, open));
  });
  root.append(plan);
}
