import { trip } from "../data/trip.js";
import { renderTrip } from "./render.js";

renderTrip(trip, document.getElementById("app"));

// 네이버 앱 딥링크(nmap://) 실패 시 웹 검색으로 폴백
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-nfallback]");
  if (!a) return;
  const fallback = a.dataset.nfallback;
  const timer = setTimeout(() => {
    window.location.href = fallback;
  }, 1200);
  // 앱으로 전환되면(창이 blur) 폴백 취소
  window.addEventListener("blur", () => clearTimeout(timer), { once: true });
  window.addEventListener("pagehide", () => clearTimeout(timer), { once: true });
});
