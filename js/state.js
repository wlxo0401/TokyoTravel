// 방문 체크 상태를 브라우저에 저장 (기기별 로컬 저장, 공유 안 됨).

const KEY = "tokyo-trip:visited";

function load() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function save(set) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    /* 시크릿 모드 등 — 무시 */
  }
}

let visited = load();

export function isVisited(key) {
  return visited.has(key);
}

export function toggleVisited(key) {
  if (visited.has(key)) visited.delete(key);
  else visited.add(key);
  save(visited);
  return visited.has(key);
}
