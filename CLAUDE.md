# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
다른 AI 도구를 쓰는 경우에도 이 파일을 프로젝트 작업 규칙으로 지정해서 사용한다.

## 작업 규칙

1. 다크모드/라이트모드 신경 쓰지 말고 라이트 모드로 고정.
2. UX/UI는 모바일 기준으로 작업한다. 하지만 PC에서도 사용할 수 있음.
3. **코드가 정본, 이 문서는 참고용.** CLAUDE.md와 실제 코드가 어긋나면 코드를
   우선으로 판단하고, 작업하는 김에 CLAUDE.md를 코드에 맞게 최신화한다.
4. **민감 정보는 넣기 전에 물어본다.** 개인정보(이름·전화번호·집 주소·여권/신분증
   번호 등)나 예약 정보(예약번호 등)를 파일에 추가해야 하는 상황이면, 먼저 사용자에게
   "정말 추가할까요?"라고 확인한다. 사용자가 진행하라고 해서 작업을 마쳤더라도,
   **커밋·푸시 직전에 한 번 더** "이 정보 포함해서 공개 저장소에 올려도 될까요?"라고
   확인한 뒤 진행한다. (배경: `data/trip.js`는 공개 배포되고 git 기록에도 남는다 —
   README "주의" 참고.)

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
- `js/state.js` — 체크 상태를 `localStorage`에 저장(기기·브라우저별, 공유 안 됨).
  범용 `store(key)` 팩토리 위에 `checklist`(준비물, `tokyo-trip:checklist`) 하나.
  `is/toggle Checked` export. (일정 "가 본 장소" 체크는 없앴다.)
- `js/render.js` — `trip` 객체를 DOM으로 그린다. 헤더 아래 **"바로가기"**(`renderQuicklinks`)를
  먼저 그리고, 그 아래 최상위 탭 **일정 / 여행 정보**(`makeTabs`, variant "main"). 기본은 일정.
  - 바로가기 = 날씨 칩(누르면 `trip.links`가 `<dialog class="wx-modal">` 모달로) +
    지도 앱 버튼(`trip.tools`)을 한 줄(`.quicklinks-strip`, 가로 스크롤·줄바꿈 없음)에.
    토글 위에 고정.
  - 여행 정보 = 상단에 Visit Japan Web 버튼(`trip.visitJapanWeb`, `.vjw-row`) + 하위 탭
    (항공편 · 숙소 · 준비물). 준비물은 `trip.checklist`(그룹→아이템, 아이템
    `key`로 체크 저장, 선택적 `url`), 상단에 "준비 완료 n / 전체" 카운터,
    목록 아래 `trip.checklistNote` 안내 문구.
  - 항공편은 `flights[]`에서 파생 (`airline`·`flightNo`·출도착 시각/터미널/좌표).
    예약번호(`bookingRef`)는 개인정보라 데이터·화면 모두에서 다루지 않는다.
  - 숙소는 상세 주소·좌표를 저장하지 않는다. `accommodation.url`(에어비앤비 여행
    목록) + `accommodation.stations[]`(주변 역 이름·좌표)로 "예약 확인 / 역별 길찾기"
    버튼만 만든다.
  - 일정 = 날짜별 탭(`renderDayBody`). 각 일자 본문 = 해당 날짜 항공편 anchor(가는 편은
    "도착", 오는 편은 "출발") + `day.note` + `day.flow[]` 세로 타임라인.
    `flow[]` 스텝: `move`(이동 구간·소요시간), `stop`(지역+`items[]`, item은 `text`만이면
    메모·`place`/`coords` 있으면 지도·길찾기 버튼·`optional:true`면 "선택 · 경로 밖" 흐리게),
    `checkin`/`checkout`(accommodation에서 파생). `move`·`stop`의 `note`는 문자열 또는
    문자열 배열(배열이면 줄마다 따로).
    체크박스·우선순위·필터는 없다.
- `js/app.js` — 진입점. 렌더 호출 + 네이버 딥링크 실패 시 웹 폴백 핸들러.

## README 다국어

`README.md`(영어)가 정본이고 `README.<lang>.md`(ko/ja/zh-CN/zh-TW/es/fr)가 번역본이다.
각 파일 상단에 `<p align="center">` 언어 선택 줄이 있고 현재 언어만 `<b>`, 나머지는
링크. README 내용을 고치면 7개 파일을 모두 같이 맞춰야 한다(영어 먼저 수정 후 번역).

## 데이터 모델 요약

`trip.days[].flow[]` (순서 있는 스텝 배열)이 "유동적 계획"의 핵심이다. 시간표가 아니라
도착→지역→숙소로 이어지는 느슨한 동선. 스텝은 `move`/`stop`/`checkin`/`checkout`.
고정 일정(비행기/체크인)은 데이터 중복 없이 `flights`와 `accommodation`에서 파생한다
(`checkin`/`checkout` 스텝은 위치만 표시하고 시각은 `accommodation`에서 읽음).
1일차만 실제 동선으로 채워져 있고 2~4일차는 `stop`만 있는 틀 상태.

`trip`의 최상위 키: `title`·`subtitle`·`dates`, `home`, `flights[]`, `accommodation`,
`links[]`(날씨), `tools[]`(지도 앱 바로가기), `visitJapanWeb`(입국 심사 URL),
`checklist[]`(준비물)·`checklistNote`, `days[]`.
