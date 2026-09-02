// 여행 데이터. 확정되지 않은 값은 "TODO"로 표시되어 있으니 채워넣으면 됩니다.
// 좌표(coords)가 null이면 지도 버튼은 "현재 위치 기준" 또는 이름 검색으로 동작합니다.
//
// ⚠️ 이 파일은 저장소에 커밋되어 공개 배포됩니다. 예약번호·여권번호·전화번호·
//    집 상세주소·도어락 비밀번호 등 민감 정보는 넣지 마세요 (README의 "주의" 참고).

export const trip = {
  title: "도쿄 여행",
  subtitle: "2026.09.10 – 09.13 · 3박 4일",
  dates: { start: "2026-09-10", end: "2026-09-13" },

  // 한국 출발지 (네이버 지도 길찾기용). 비워두면 "현재 위치"에서 출발.
  home: {
    name: "집",
    address: "TODO: 출발지 주소",
    coords: null, // { lat: 37.xxxx, lng: 127.xxxx }
  },

  // 항공편: kind = "outbound"(가는 편) | "inbound"(오는 편)
  // bookingRef(예약번호)는 개인정보라 넣지 않음 — 필요하면 각자 기기에서만 보관.
  flights: [
    {
      kind: "outbound",
      date: "2026-09-10",
      airline: "진에어",
      flightNo: "LJ201",
      depart: {
        airport: "ICN",
        name: "인천국제공항 제2여객터미널",
        terminal: "T2",
        time: "2026-09-10T07:25",
        coords: { lat: 37.4602, lng: 126.4407 },
      },
      arrive: {
        airport: "NRT",
        name: "나리타 국제공항",
        terminal: "T1",
        time: "2026-09-10T09:55",
        coords: { lat: 35.7719, lng: 140.3929 },
      },
    },
    {
      kind: "inbound",
      date: "2026-09-13",
      airline: "진에어",
      flightNo: "LJ212",
      depart: {
        airport: "NRT",
        name: "나리타 국제공항",
        terminal: "T1",
        time: "2026-09-13T19:15",
        coords: { lat: 35.7719, lng: 140.3929 },
      },
      arrive: {
        airport: "ICN",
        name: "인천국제공항 제2여객터미널",
        terminal: "T2",
        time: "2026-09-13T21:45",
        coords: { lat: 37.4602, lng: 126.4407 },
      },
    },
  ],

  // 숙소 (에어비앤비). 상세 주소·예약번호는 공개 저장소에 넣지 않는다 —
  // "예약 확인" 버튼이 에어비앤비 여행 목록으로 보내주면 앱에서 직접 확인.
  accommodation: {
    name: "에어비앤비",
    area: "신주쿠",
    address: "신주쿠",
    coords: null, // 정확 좌표는 저장 안 함
    checkIn: "2026-09-10T16:00",
    checkOut: "2026-09-13T10:00",
    url: "https://www.airbnb.com/trips",
    notes: "상세 주소 · 체크인 방법 · 도어락 · 와이파이는 에어비앤비 예약/메시지에서 확인",
    // 숙소 주변 역. 정확한 숙소 위치 대신 이 역들 기준으로 길찾기 버튼을 만든다.
    stations: [
      { name: "신주쿠역", coords: { lat: 35.6900, lng: 139.7004 } },
      { name: "신오쿠보역", coords: { lat: 35.7013, lng: 139.7003 } },
      { name: "히가시신주쿠역", coords: { lat: 35.6976, lng: 139.7069 } },
    ],
  },

  // 참고 링크 (날씨·기상 등). icon은 이모지.
  links: [
    {
      label: "기상 레이더 (JMA 나우캐스트)",
      icon: "🌧️",
      url: "https://www.jma.go.jp/bosai/multi_nowc/?lang=kr#zoom:10/lat:35.691322/lon:139.579926/colordepth:undefined/elements:hrpns",
    },
    {
      label: "날씨 예보 (tenki.jp · 도쿄)",
      icon: "☀️",
      url: "https://tenki.jp/forecast/3/16/",
    },
    {
      label: "오늘의 옷차림 지수 (tenki.jp · 도쿄)",
      icon: "👕",
      url: "https://tenki.jp/indexes/dress/3/16/",
    },
  ],

  // 지도 앱 바로가기 (특정 목적지 없이 앱만 실행). "바로가기" 줄에 버튼으로 표시.
  tools: [
    { label: "구글 지도", icon: "🗺️", url: "https://www.google.com/maps" },
    { label: "애플 지도", icon: "🍎", url: "https://maps.apple.com/" },
  ],

  // 입국 심사용 Visit Japan Web. 여행 정보 탭 상단에 버튼으로 표시.
  visitJapanWeb: "https://services.digital.go.jp/ko/visit-japan-web/",

  // 준비물 체크리스트. 체크 상태는 기기(localStorage)에 저장 — 기기·브라우저마다 별도, 공유 안 됨.
  // key는 라벨을 바꿔도 유지되도록 고정 문자열로 둔다.
  // checklistNote: 목록 아래에 표시되는 안내 문구.
  checklistNote: "여긴 최소한만 적어둔 것. 그 외 개인적으로 필요한 건 각자 알아서 잘 챙기기.",
  checklist: [
    {
      group: "필수 확인",
      items: [
        { key: "passport", label: "여권 (유효기간 6개월 이상 남았는지)" },
        { key: "vjw", label: "Visit Japan Web 등록·심사 QR 발급", url: "https://services.digital.go.jp/ko/visit-japan-web/" },
        { key: "boarding", label: "항공권 / 모바일 탑승권 확인" },
        { key: "stay", label: "숙소 예약·체크인 확인" },
        { key: "esim", label: "해외 데이터 (eSIM / 로밍)" },
        { key: "money", label: "해외결제 카드 + 엔화 현금" },
        { key: "insurance", label: "여행자 보험" },
      ],
    },
    {
      group: "짐",
      items: [
        { key: "charger", label: "충전기 · 케이블" },
        { key: "plug", label: "변환 플러그 (일본 A타입 · 100V)" },
        { key: "clothes", label: "옷" },
        { key: "toiletries", label: "세면도구" },
        { key: "battery", label: "보조배터리" },
        { key: "shoes", label: "걷기 편한 신발" },
        { key: "bags", label: "비닐봉투 몇 장 (빨래 · 젖은 옷)" },
      ],
    },
  ],

  // 일자별 계획: 시간표가 아니라 "도착 → 지역 → 숙소" 순서 있는 동선(flow).
  // flow[] 스텝 종류:
  //   { kind: "move",  label, mins?, note? }                              — 이동 구간
  //   { kind: "stop",  area, coords, note?, items: [ { text, place?, coords?, optional? } ] }  — 지역 + 할 것들
  //   note는 문자열 또는 문자열 배열(배열이면 줄마다 따로 표시)
  //   { kind: "checkin" } | { kind: "checkout" }                          — accommodation에서 파생
  // items의 항목은 text만 있으면 메모, place/coords가 붙으면 지도·길찾기 버튼이 생긴다.
  // optional: true면 "선택 · 경로 밖"으로 흐리게 표시 (동선에서 벗어난 곳).
  // 좌표가 없으면 지도 버튼은 이름 검색으로 degrade. 해당 날짜 항공편은 자동으로 맨 위 표시.
  days: [
    {
      date: "2026-09-10",
      title: "1일차 · 도착 & 아사쿠사·아키하바라, 밤엔 도쿄타워·긴자",
      note: "오전 도착. 우에노역 코인락커에 짐 맡기고 아사쿠사·아키하바라 돌다가 우에노에서 짐 찾아 숙소로. 저녁엔 숙소 정비 후 도쿄타워·긴자·유라쿠초. 시각은 대략이고 이동 시간만 참고.",
      flow: [
        {
          kind: "move",
          label: "케이세이 스카이라이너 (나리타 T1 → 게이세이우에노, 직통)",
          mins: 40,
          note: [
            "탑승: 제1터미널 지하 1층 게이세이선 승강장. 입국장(1층)에서 'Keisei Line / 京成線' 표지판 따라 지하로 내려감.",
            "발권: 지하 1층 스카이라이너 카운터 또는 자동발권기에서 좌석 지정표 → 개찰구 → 스카이라이너 전용 승강장(4·5번).",
            "요금 약 2,570엔. 배차 약 20분 간격. 게이세이우에노역까지 중간 정차 없이 약 36~40분.",
            "게이세이우에노역 = JR 우에노역과 도보 2~3분. 대안(액세스 특급 1,270엔·55~65분, 지정석 없음 / 리무진 버스)보다 첫날 체력엔 스카이라이너가 확실.",
          ],
        },
        {
          kind: "stop",
          area: "우에노",
          coords: { lat: 35.7138, lng: 139.7770 },
          items: [
            { text: "코인락커에 캐리어 맡기기 — 우에노역은 도쿄에서 락커 수 손꼽히게 많아 빈 칸 찾기 쉬움" },
          ],
        },
        {
          kind: "move",
          label: "도쿄메트로 긴자선 (우에노 → 아사쿠사)",
          mins: 6,
        },
        {
          kind: "stop",
          area: "아사쿠사",
          coords: { lat: 35.7119, lng: 139.7960 },
          items: [
            { text: "센소지 · 가미나리몬 · 나카미세 거리", place: "센소지", coords: { lat: 35.7148, lng: 139.7967 } },
          ],
        },
        {
          kind: "move",
          label: "츠쿠바 익스프레스 (아사쿠사 → 아키하바라)",
          mins: 5,
        },
        {
          kind: "stop",
          area: "아키하바라",
          coords: { lat: 35.6984, lng: 139.7731 },
          items: [
            { text: "전자상가 · 요도바시 아키바 · 애니메이트 구경", place: "아키하바라 전자상가", coords: { lat: 35.6989, lng: 139.7719 } },
            { text: "GENERAL STORE RAILYARD 秋葉原 — 아키하바라역 안 철도 굿즈 기념품샵 (쇼와도리 개찰구 쪽)", place: "GENERAL STORE RAILYARD 秋葉原", coords: { lat: 35.6981328, lng: 139.7747761 } },
            { text: "코미야 상점(小宮商店) — 일본 전통 우산 가게. 아키하바라에서 남동쪽으로 약 1.5km 떨어져 있어 일정과 별개로 들르게 되면.", place: "小宮商店 Komiya Shoten", coords: { lat: 35.691993, lng: 139.783905 }, optional: true },
          ],
        },
        {
          kind: "move",
          label: "아키하바라 → 우에노에서 캐리어 회수 → JR 야마노테선 신오쿠보 방면",
          mins: 35,
          note: "아키하바라–우에노는 JR로 1~2정거장(약 4분). 우에노–신오쿠보는 야마노테선 약 25분.",
        },
        { kind: "checkin" },
        {
          kind: "move",
          label: "숙소 정비 후 이동 · 히가시신주쿠 → 오에도선 → 아카바네바시(도보 5분)",
          mins: 30,
        },
        {
          kind: "stop",
          area: "도쿄타워",
          coords: { lat: 35.6586, lng: 139.7454 },
          items: [
            { text: "야경 · 외부 인증샷 (또는 전망대)", place: "도쿄타워", coords: { lat: 35.6586, lng: 139.7454 } },
          ],
        },
        {
          kind: "move",
          label: "도쿄타워 → 카미야초에서 히비야선 → 긴자",
          mins: 20,
        },
        {
          kind: "stop",
          area: "긴자",
          coords: { lat: 35.6717, lng: 139.7650 },
          note: "백화점·브랜드 매장(긴자식스·미츠코시 등)은 20:00~20:30 마감. 도쿄타워 보고 오면 쇼핑보다 저녁 식사 + 명품거리·건물 야경 감상 위주 — 그게 목적이면 타이밍 딱 좋음.",
          items: [
            { text: "저녁 식사", place: "긴자 4초메 교차로", coords: { lat: 35.6717, lng: 139.7650 } },
            { text: "긴자 명품거리 · 건물 야경 산책" },
          ],
        },
        {
          kind: "move",
          label: "긴자 → 유라쿠초 (도보)",
          mins: 7,
        },
        {
          kind: "stop",
          area: "유라쿠초",
          coords: { lat: 35.6749, lng: 139.7628 },
          items: [
            { text: "가드시타(고가 밑) 선술집에서 한잔", place: "유라쿠초 가드시타", coords: { lat: 35.6746, lng: 139.7630 } },
          ],
        },
        {
          kind: "move",
          label: "유라쿠초 → 숙소 (귀가) · 밤에 신주쿠 방면 선택지",
          note: [
            "① JR 야마노테선 — 환승 없음. 유라쿠초에서 신주쿠 약 26분. 숙소가 신오쿠보 쪽이면 직통이라 제일 편하고, 히가시신주쿠면 신주쿠에서 후쿠토신·오에도선 1정거장 또는 도보 10분.",
            "② 긴자역 마루노우치선 — 유라쿠초에서 지하도로 도보 2~3분. 신주쿠산초메까지 약 17분, 거기서 후쿠토신선으로 히가시신주쿠 1정거장. 히가시신주쿠면 이게 제일 매끄러움.",
            "③ JR 주오선 쾌속(가장 빠름) — 유라쿠초 → 도쿄역(야마노테 1정거장 또는 도보 8분) → 주오선 쾌속으로 신주쿠 약 14분.",
            "막차: 야마노테·마루노우치선 대략 자정~00:30. 히비야·치요다·유라쿠초선은 신주쿠를 지나지 않음.",
          ],
        },
      ],
    },
    {
      date: "2026-09-11",
      title: "2일차 · 하라주쿠 / 시부야",
      note: "쇼핑 데이. 동선: 하라주쿠 → 오모테산도 → 시부야.",
      flow: [
        {
          kind: "stop",
          area: "하라주쿠 · 오모테산도",
          coords: { lat: 35.6702, lng: 139.7027 },
          items: [
            { text: "다케시타 거리", place: "다케시타 거리", coords: { lat: 35.6716, lng: 139.7050 } },
            { text: "오모테산도 힐즈", place: "오모테산도 힐즈", coords: { lat: 35.6659, lng: 139.7118 } },
          ],
        },
        {
          kind: "stop",
          area: "시부야",
          coords: { lat: 35.6595, lng: 139.7005 },
          items: [
            { text: "시부야 스크램블 스퀘어 (전망대)", place: "시부야 스크램블 스퀘어", coords: { lat: 35.6580, lng: 139.7016 } },
            { text: "미야시타 파크", place: "미야시타 파크", coords: { lat: 35.6614, lng: 139.7009 } },
          ],
        },
      ],
    },
    {
      date: "2026-09-12",
      title: "3일차 · 아사쿠사 / 우에노",
      note: "구도심. 오전 일찍 아사쿠사, 오후 우에노.",
      flow: [
        {
          kind: "stop",
          area: "아사쿠사",
          coords: { lat: 35.7148, lng: 139.7967 },
          items: [
            { text: "센소지", place: "센소지", coords: { lat: 35.7148, lng: 139.7967 } },
            { text: "나카미세 거리", place: "나카미세 거리", coords: { lat: 35.7119, lng: 139.7960 } },
          ],
        },
        {
          kind: "stop",
          area: "우에노",
          coords: { lat: 35.7138, lng: 139.7770 },
          items: [
            { text: "아메요코 시장", place: "아메요코 시장", coords: { lat: 35.7089, lng: 139.7745 } },
          ],
        },
      ],
    },
    {
      date: "2026-09-13",
      title: "4일차 · 귀국",
      note: "공항 이동은 여유있게. 출발 3시간 전 도착 권장.",
      flow: [
        { kind: "checkout" },
        {
          kind: "move",
          label: "숙소(히가시신주쿠) → 나리타 공항",
          mins: 90,
          note: "신주쿠에서 나리타 익스프레스(N'EX) 또는 공항버스.",
        },
      ],
    },
  ],
};
