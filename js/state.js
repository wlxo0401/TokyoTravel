// 체크 상태를 브라우저에 저장 (기기·브라우저별 로컬 저장, 일행과 공유 안 됨).

function load(key) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch {
    return new Set();
  }
}

function save(key, set) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    /* 시크릿 모드 등 — 무시 */
  }
}

function store(key) {
  const set = load(key);
  return {
    has: (k) => set.has(k),
    toggle: (k) => {
      if (set.has(k)) set.delete(k);
      else set.add(k);
      save(key, set);
      return set.has(k);
    },
  };
}

const checklist = store("tokyo-trip:checklist"); // 준비물 체크

export const isChecked = (k) => checklist.has(k);
export const toggleChecked = (k) => checklist.toggle(k);
