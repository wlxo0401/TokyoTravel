import {
  googlePlace,
  googleDirections,
  naverSearch,
  naverRoute,
  flightStatusUrl,
} from "./maps.js";
import { isVisited, toggleVisited, isChecked, toggleChecked } from "./state.js";

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

// 링크 버튼. naver=true면 앱 딥링크(nmap://) + 웹 폴백(app.js가 data-nfallback 처리).
function linkBtn(text, href, { naver = false, fallback = "" } = {}) {
  const a = el("a", "btn", text);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener";
  if (naver && fallback) a.dataset.nfallback = fallback;
  return a;
}

/* ---------- 탭 ---------- */

// items: [{ id, label(HTML), render: () => Node }]
function makeTabs(items, variant = "") {
  const wrap = el("div", "tabs");
  const nav = el("div", "tabnav" + (variant ? " tabnav-" + variant : ""));
  const panel = el("div", "tabpanel");

  const select = (id) => {
    nav.querySelectorAll(".tab").forEach((b) => b.classList.toggle("on", b.dataset.id === id));
    panel.innerHTML = "";
    const item = items.find((i) => i.id === id);
    if (item) panel.append(item.render());
  };

  items.forEach((it) => {
    const b = el("button", "tab", it.label);
    b.dataset.id = it.id;
    b.addEventListener("click", () => select(it.id));
    nav.append(b);
  });

  wrap.append(nav, panel);
  select((items[0] || {}).id);
  return wrap;
}

/* ---------- 여행 정보 : 항공편 ---------- */

function renderFlights(trip) {
  const sec = el("section", "card");
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
    box.append(el("div", "muted small", `${f.airline} ${f.flightNo}`));

    const btns = el("div", "btn-row");
    if (f.kind === "outbound") {
      btns.append(
        linkBtn("공항 길찾기 (네이버)", naverRoute({ from: trip.home.coords, to: f.depart.coords, toName: f.depart.name }), {
          naver: true,
          fallback: naverSearch(f.depart.name),
        })
      );
      btns.append(linkBtn("공항 지도 (네이버)", naverSearch(f.depart.name)));
    } else {
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
    }
    btns.append(linkBtn("실시간 운항", flightStatusUrl(f.airline, f.flightNo)));
    box.append(btns);
    sec.append(box);
  });

  return sec;
}

/* ---------- 여행 정보 : 숙소 ---------- */

function renderStay(trip) {
  const a = trip.accommodation;
  const sec = el("section", "card");
  sec.append(el("h2", null, "🏠 숙소"));
  sec.append(el("div", null, `<strong>${a.name}</strong> · ${a.area}`));
  if (a.address && a.address !== a.area) sec.append(el("div", "muted small", a.address));
  sec.append(
    el(
      "div",
      "muted small",
      `체크인 ${fmtDate(a.checkIn.slice(0, 10))} ${fmtTime(a.checkIn)} · 체크아웃 ${fmtDate(a.checkOut.slice(0, 10))} ${fmtTime(a.checkOut)}`
    )
  );
  if (a.notes) sec.append(el("div", "small note", a.notes));

  const btns = el("div", "btn-row");
  if (a.url && !a.url.startsWith("TODO")) btns.append(linkBtn("에어비앤비 예약 확인", a.url));
  (a.stations || []).forEach((s) =>
    btns.append(linkBtn(`${s.name} 길찾기`, googleDirections({ destination: s.coords || s.name, mode: "transit" })))
  );
  sec.append(btns);
  return sec;
}

/* ---------- 여행 정보 : 날씨 드롭다운 ---------- */

function renderWeather(trip) {
  const d = el("details", "dropdown");
  d.append(el("summary", null, "🌤️ 날씨"));
  const menu = el("div", "dropdown-menu");
  (trip.links || []).forEach((l) => menu.append(linkBtn(`${l.icon || "🔗"} ${l.label}`, l.url)));
  d.append(menu);
  return d;
}

/* ---------- 여행 정보 : 바로가기 (날씨 + 지도 앱) ---------- */

// 날씨 드롭다운 + 지도 앱 버튼을 한 줄에 모은 "바로가기" 영역.
function renderQuicklinks(trip) {
  const wrap = el("div");
  wrap.append(el("div", "section-label", "바로가기"));
  const row = el("div", "quicklinks");
  row.append(renderWeather(trip));
  (trip.tools || []).forEach((t) => row.append(linkBtn(`${t.icon || "🔗"} ${t.label}`, t.url)));
  wrap.append(row);
  return wrap;
}

/* ---------- 여행 정보 : 준비물 체크리스트 ---------- */

function renderChecklist(trip) {
  const groups = trip.checklist || [];
  const wrap = el("div", "checklist");
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const done = () => groups.reduce((n, g) => n + g.items.filter((it) => isChecked(it.key)).length, 0);

  const head = el("div", "checklist-head small");
  const refreshHead = () => (head.textContent = `준비 완료 ${done()} / ${total}`);
  refreshHead();
  wrap.append(head);

  groups.forEach((g) => {
    const sec = el("section", "card");
    sec.append(el("h3", "check-group", g.group));
    g.items.forEach((it) => {
      const row = el("div", "check-item");
      const box = el("input");
      box.type = "checkbox";
      box.checked = isChecked(it.key);
      const sync = () => row.classList.toggle("done", box.checked);
      box.addEventListener("change", () => {
        toggleChecked(it.key);
        sync();
        refreshHead();
      });
      sync();

      const txt = el("span", "check-label", it.label);
      txt.addEventListener("click", () => {
        box.checked = !box.checked;
        box.dispatchEvent(new Event("change"));
      });

      row.append(box, txt);
      if (it.url) {
        const a = el("a", "check-link", "열기 ↗");
        a.href = it.url;
        a.target = "_blank";
        a.rel = "noopener";
        row.append(a);
      }
      sec.append(row);
    });
    wrap.append(sec);
  });

  wrap.append(el("div", "small muted note", "체크 상태는 이 기기에만 저장됩니다 (일행과 공유되지 않음)."));
  return wrap;
}

function renderUtility(trip) {
  const box = el("div");
  box.append(renderQuicklinks(trip));
  box.append(
    makeTabs([
      { id: "flights", label: "항공편", render: () => renderFlights(trip) },
      { id: "stay", label: "숙소", render: () => renderStay(trip) },
      { id: "checklist", label: "준비물", render: () => renderChecklist(trip) },
    ])
  );
  return box;
}

/* ---------- 일정 ---------- */

let planFilter = "all";

function applyFilter(scope) {
  scope.querySelectorAll(".place").forEach((p) => {
    p.hidden = planFilter !== "all" && p.dataset.priority !== planFilter;
  });
}

function renderFilter(scope) {
  const bar = el("div", "filter");
  [
    ["all", "전체"],
    ["must", "꼭"],
    ["want", "가고싶음"],
    ["maybe", "여유되면"],
  ].forEach(([val, label]) => {
    const b = el("button", "chip" + (planFilter === val ? " on" : ""), label);
    b.addEventListener("click", () => {
      planFilter = val;
      bar.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === b));
      applyFilter(scope);
    });
    bar.append(b);
  });
  return bar;
}

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
    el("div", "place-name", `${CATEGORY[place.category] || "📍"} ${place.name} <span class="pill ${p.cls}">${p.label}</span>`)
  );
  if (place.note) main.append(el("div", "muted small", place.note));

  const btns = el("div", "btn-row");
  btns.append(linkBtn("지도", googlePlace(place.coords, place.name)));
  btns.append(linkBtn("길찾기", googleDirections({ destination: place.coords || place.name, mode: "walking" })));
  main.append(btns);

  row.dataset.priority = place.priority;
  row.append(check, main);
  return row;
}

function renderDayBody(trip, day) {
  const wrap = el("div", "day-body");

  const anchors = [];
  trip.flights.forEach((f) => {
    if (f.date === day.date) {
      const t = f.kind === "outbound" ? `${f.depart.airport} 출발` : `${f.arrive.airport} 도착`;
      anchors.push(`✈️ ${fmtTime(f.kind === "outbound" ? f.depart.time : f.arrive.time)} ${t}`);
    }
  });
  if (trip.accommodation.checkIn.startsWith(day.date))
    anchors.push(`🔑 ${fmtTime(trip.accommodation.checkIn)} 체크인`);
  if (trip.accommodation.checkOut.startsWith(day.date))
    anchors.push(`🧳 ${fmtTime(trip.accommodation.checkOut)} 체크아웃`);
  if (anchors.length) wrap.append(el("div", "anchors small", anchors.join("<br>")));

  if (day.note) wrap.append(el("div", "note small", day.note));

  day.areas.forEach((area) => {
    const box = el("div", "area");
    const head = el("div", "area-head");
    head.append(el("span", "area-name", area.name));
    head.append(linkBtn("지역 지도", googlePlace(area.coords, area.name)));
    box.append(head);
    if (area.note) box.append(el("div", "muted small", area.note));
    area.places.forEach((pl) => box.append(placeRow(day, area, pl)));
    wrap.append(box);
  });

  if (!day.areas.length) wrap.append(el("div", "muted small", "계획 미정 — 자유롭게 채워보세요."));

  applyFilter(wrap);
  return wrap;
}

function renderPlan(trip) {
  const box = el("div");
  box.append(renderFilter(box));
  box.append(
    makeTabs(
      trip.days.map((day, i) => {
        const d = new Date(day.date + "T00:00");
        return {
          id: day.date,
          label: `${i + 1}일차<small>${d.getMonth() + 1}/${d.getDate()}</small>`,
          render: () => renderDayBody(trip, day),
        };
      })
    )
  );
  return box;
}

/* ---------- 진입 ---------- */

export function renderTrip(trip, root) {
  root.innerHTML = "";
  const header = el("header", "hero");
  header.append(el("h1", null, trip.title));
  header.append(el("div", "muted", trip.subtitle));
  root.append(header);

  root.append(
    makeTabs(
      [
        { id: "util", label: "여행 정보", render: () => renderUtility(trip) },
        { id: "plan", label: "일정", render: () => renderPlan(trip) },
      ],
      "main"
    )
  );
}
