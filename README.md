# 도쿄 여행 (2026.09.10–13)

GitHub Pages로 배포하는 정적 여행 계획 웹앱. 빌드 도구 없음.

## 로컬에서 보기

```bash
python3 -m http.server 8000
# http://localhost:8000
```

`index.html`을 브라우저로 바로 열면 ES 모듈 로딩이 막히므로 꼭 서버로 띄울 것.

## 배포

1. GitHub 저장소 → **Settings → Pages**
2. **Source: Deploy from a branch**, Branch: `main` / `/(root)`
3. 몇 분 뒤 `https://wlxo0401.github.io/TokyoTravel/` 에서 접속

## 내용 수정

거의 모든 것은 [`data/trip.js`](data/trip.js) 하나만 고치면 됨.

- `TODO`로 표시된 값(항공사·편명·시간·예약번호·숙소 주소/좌표)을 채우기
- 좌표(`coords`)를 넣으면 지도/길찾기 버튼이 정확해짐 (없으면 이름 검색·현재 위치로 동작)
- 일정: `days[].areas[].places[]` — 시간표가 아니라 "지역 → 후보 장소" 구조.
  `priority`는 `must`(꼭) / `want`(가고싶음) / `maybe`(여유되면)

## 지도 규칙

- 한국 내 이동(집 → 인천공항 등) → 네이버 지도
- 일본 내 이동(숙소 → 나리타공항, 각 장소) → 구글 지도
