import {
  googlePlace,
  googleDirections,
  naverSearch,
  naverRoute,
  flightStatusUrl,
} from "./maps.js";
import { isChecked, toggleChecked } from "./state.js";

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

/* ---------- 여행 정보 : 날씨 (칩 → 모달) ---------- */

// 날씨 칩 버튼 + 눌렀을 때 뜨는 <dialog> 모달을 하나의 fragment로 반환.
function renderWeather(trip) {
  const frag = document.createDocumentFragment();

  const btn = el("button", "btn", "🌤️ 날씨");
  const dlg = el("dialog", "wx-modal");
  dlg.append(el("div", "wx-modal-title", "🌤️ 날씨"));
  const menu = el("div", "wx-modal-menu");
  (trip.links || []).forEach((l) => menu.append(linkBtn(`${l.icon || "🔗"} ${l.label}`, l.url)));
  dlg.append(menu);
  const close = el("button", "btn wx-modal-close", "닫기");
  dlg.append(close);

  btn.addEventListener("click", () => dlg.showModal());
  close.addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) dlg.close(); // 배경 클릭으로 닫기
  });

  frag.append(btn, dlg);
  return frag;
}

/* ---------- 여행 정보 : 바로가기 (날씨 + 지도 앱) ---------- */

// 날씨 칩 + 지도 앱 버튼을 한 줄(가로 스크롤)에 모은 "바로가기" 영역.
function renderQuicklinks(trip) {
  const wrap = el("div");
  wrap.append(el("div", "section-label", "바로가기"));
  const box = el("div", "quicklinks");
  const strip = el("div", "quicklinks-strip");
  strip.append(renderWeather(trip));
  (trip.tools || []).forEach((t) => strip.append(linkBtn(`${t.icon || "🔗"} ${t.label}`, t.url)));
  box.append(strip);
  wrap.append(box);
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

  if (trip.checklistNote) wrap.append(el("div", "small note", trip.checklistNote));
  wrap.append(el("div", "small muted note", "체크 상태는 이 기기에만 저장됩니다 (일행과 공유되지 않음)."));
  return wrap;
}

function renderUtility(trip) {
  const box = el("div");
  if (trip.visitJapanWeb) {
    const row = el("div", "vjw-row");
    row.append(linkBtn("🇯🇵 Visit Japan Web (입국 심사 QR)", trip.visitJapanWeb));
    box.append(row);
  }
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

// step.note는 문자열 또는 문자열 배열 — 배열이면 줄마다 별도로 그린다.
function appendNote(box, note) {
  if (!note) return;
  (Array.isArray(note) ? note : [note]).forEach((n) => box.append(el("div", "muted small", n)));
}

// stop 스텝: 한 지역 + 그 안에서 하는 것들(items)
function flowStop(step) {
  const box = el("div", "flow-stop");
  const head = el("div", "area-head");
  head.append(el("span", "area-name", `📍 ${step.area}`));
  head.append(linkBtn("지역 지도", googlePlace(step.coords, step.area)));
  box.append(head);
  appendNote(box, step.note);

  (step.items || []).forEach((it) => {
    const row = el("div", "flow-item" + (it.optional ? " flow-item-opt" : ""));
    row.append(el("div", null, it.optional ? `<span class="opt-tag">선택 · 경로 밖</span> ${it.text}` : it.text));
    if (it.place || it.coords) {
      const btns = el("div", "btn-row");
      btns.append(linkBtn("지도", googlePlace(it.coords, it.place || it.text)));
      btns.append(
        linkBtn("길찾기", googleDirections({ destination: it.coords || it.place || it.text, mode: "transit" }))
      );
      row.append(btns);
    }
    box.append(row);
  });
  return box;
}

// move 스텝: 이동 구간 (노선 + 소요시간)
function flowMove(step) {
  const box = el("div", "flow-move");
  const mins = step.mins ? ` <span class="muted">· 약 ${step.mins}분</span>` : "";
  box.append(el("div", null, `🚆 ${step.label}${mins}`));
  appendNote(box, step.note);
  return box;
}

// checkin/checkout 스텝: accommodation에서 파생 (데이터 중복 없음)
function flowStay(trip, kind) {
  const a = trip.accommodation;
  const box = el("div", "flow-stay");
  if (kind === "checkin")
    box.append(el("div", null, `🏠 ${fmtTime(a.checkIn)}~ ${a.area} 숙소 체크인 · 짐 넣기`));
  else box.append(el("div", null, `🧳 ${fmtTime(a.checkOut)}까지 체크아웃`));
  return box;
}

function renderStep(trip, step) {
  if (step.kind === "move") return flowMove(step);
  if (step.kind === "checkin" || step.kind === "checkout") return flowStay(trip, step.kind);
  return flowStop(step);
}

function renderDayBody(trip, day) {
  const wrap = el("div", "day-body");

  // 해당 날짜의 항공편은 자동으로 맨 위에 표시.
  // 가는 편은 "도착"(도쿄 기준), 오는 편은 "출발"이 그날의 기준점.
  const anchors = [];
  trip.flights.forEach((f) => {
    if (f.date === day.date) {
      const out = f.kind === "outbound";
      const p = out ? f.arrive : f.depart;
      anchors.push(`✈️ ${fmtTime(p.time)} ${p.airport} ${out ? "도착" : "출발"}`);
    }
  });
  if (anchors.length) wrap.append(el("div", "anchors small", anchors.join("<br>")));

  // day.note는 문자열 또는 문자열 배열
  if (day.note)
    (Array.isArray(day.note) ? day.note : [day.note]).forEach((n) => wrap.append(el("div", "note small", n)));

  const flow = day.flow || [];
  if (flow.length) {
    const tl = el("div", "flow");
    flow.forEach((step) => tl.append(renderStep(trip, step)));
    wrap.append(tl);
  } else {
    wrap.append(el("div", "muted small", "계획 미정 — 자유롭게 채워보세요."));
  }

  return wrap;
}

function renderPlan(trip) {
  const box = el("div");
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

  // "바로가기"(날씨 + 지도 앱)는 여행 정보/일정 토글 위에 고정 표시
  root.append(renderQuicklinks(trip));

  root.append(
    makeTabs(
      [
        { id: "plan", label: "일정", render: () => renderPlan(trip) },
        { id: "util", label: "여행 정보", render: () => renderUtility(trip) },
      ],
      "main"
    )
  );
}
