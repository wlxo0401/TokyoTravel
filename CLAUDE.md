# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 작업 규칙

1. 다크모드/라이트모드 신경 쓰지 말고 라이트 모드로 고정.
2. UX/UI는 모바일 기준으로 작업한다. 하지만 PC에서도 사용할 수 있음.

## 프로젝트 개요

2026년 9월 10–13일 도쿄 여행용 개인 웹앱. GitHub Pages(정적 호스팅)로 배포하며
빌드 도구·백엔드·프레임워크 없이 순수 정적 파일로만 동작한다. ES 모듈을 브라우저에서
직접 로드하므로 트랜스파일 단계가 없다.

- 개발: 정적 서버로 루트를 서빙 (`python3 -m http.server` 등). `file://` 직접 열기는
  ES 모듈 CORS 때문에 안 됨.
- 배포: Settings → Pages → Deploy from branch → `main` / `/ (root)`.
  URL은 `https://wlxo0401.github.io/TokyoTravel/` (하위 경로) — 모든 자산 경로는 상대경로 유지.
- `.nojekyll`로 Jekyll 처리 생략.

## 구조

- `data/trip.js` — 여행 데이터 전부(항공편·숙소·일자별 계획)를 담은 단일 객체 `trip`.
  화면에 나오는 내용을 바꾸려면 대부분 이 파일만 수정하면 된다. `TODO` 문자열이
  미확정 값(항공사·편명·좌표 등) 표시.
- `js/maps.js` — 지도 링크 생성. **핵심 규칙: 한국 내 이동은 네이버(`nmap://` 딥링크 +
  웹 검색 폴백), 일본 내 이동은 구글 Maps URL.** 좌표가 없으면 "현재 위치"/이름 검색으로
  degrade 하도록 설계됨.
- `js/state.js` — 장소 "가봤음" 체크를 `localStorage`에 저장(기기 로컬, 공유 안 됨).
- `js/render.js` — `trip` 객체를 DOM으로 그린다. 일자 카드에는 해당 날짜의 항공편·
  체크인/아웃 "고정 일정"을 자동으로 끼워 넣고(`renderDay`의 anchors), 나머지는
  `지역 → 후보 장소(priority: must/want/maybe)` 계층으로 유동적으로 표시. 우선순위
  필터 칩이 `.place[data-priority]`를 토글.
- `js/app.js` — 진입점. 렌더 호출 + 네이버 딥링크 실패 시 웹 폴백 핸들러.

## 데이터 모델 요약

`trip.days[].areas[].places[]` 3단 계층이 "유동적 계획"의 핵심이다. 시간표가 아니라
느슨한 순서 + 후보 목록. 고정 일정(비행기/체크인)은 데이터 중복 없이 `flights`와
`accommodation`에서 파생시켜 표시한다.
