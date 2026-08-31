// 지도 링크 생성 유틸.
// 규칙: 한국 내 이동 → 네이버 지도 / 일본 내 이동 → 구글 지도.

const enc = encodeURIComponent;

// 좌표 또는 문자열을 "lat,lng" 또는 검색어로 변환
export function pointToQuery(point, fallbackName = "") {
  if (!point) return fallbackName;
  if (typeof point === "string") return point;
  if (point.lat != null && point.lng != null) return `${point.lat},${point.lng}`;
  return point.name || point.query || fallbackName;
}

/* ---------- 구글 지도 ---------- */

export function googlePlace(point, name = "") {
  return `https://www.google.com/maps/search/?api=1&query=${enc(pointToQuery(point, name))}`;
}

// origin 생략 시 "현재 위치"에서 출발
export function googleDirections({ origin, destination, mode = "transit" }) {
  const p = new URLSearchParams({ api: "1", travelmode: mode });
  if (origin) p.set("origin", pointToQuery(origin));
  p.set("destination", pointToQuery(destination));
  return `https://www.google.com/maps/dir/?${p.toString()}`;
}

/* ---------- 네이버 지도 ---------- */

export function naverSearch(query) {
  return `https://map.naver.com/p/search/${enc(query)}`;
}

// 네이버 앱 대중교통 길찾기 딥링크. 출발지 생략 시 현재 위치 기준.
// 앱이 없으면 naverSearch(destName)로 폴백 (app.js 핸들러가 처리).
export function naverRoute({ from, to, toName, mode = "public" }) {
  const p = new URLSearchParams();
  if (from && from.lat != null) {
    p.set("slat", from.lat);
    p.set("slng", from.lng);
    p.set("sname", from.name || "출발");
  }
  if (to && to.lat != null) {
    p.set("dlat", to.lat);
    p.set("dlng", to.lng);
  }
  p.set("dname", toName || (to && to.name) || "도착");
  p.set("appname", (typeof location !== "undefined" && location.origin) || "https://wlxo0401.github.io");
  return `nmap://route/${mode}?${p.toString()}`;
}

/* ---------- 실시간 운항 정보 ---------- */

export function flightStatusUrl(airline, flightNo) {
  return `https://www.google.com/search?q=${enc(`${airline} ${flightNo} flight status`)}`;
}
