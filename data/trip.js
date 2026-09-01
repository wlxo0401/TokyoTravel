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
        terminal: "TODO",
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
        terminal: "TODO",
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
    checkIn: "2026-09-10T15:00",
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

  // 지도 앱·웹 바로가기 (특정 목적지 없이 앱만 실행). 유틸리티 상단에 버튼으로 표시.
  tools: [
    { label: "구글 지도", icon: "🗺️", url: "https://www.google.com/maps" },
    { label: "애플 지도", icon: "🍎", url: "https://maps.apple.com/" },
    { label: "Visit Japan Web", icon: "🇯🇵", url: "https://services.digital.go.jp/ko/visit-japan-web/" },
  ],

  // 준비물 체크리스트. 체크 상태는 기기(localStorage)에 저장 — 기기·브라우저마다 별도, 공유 안 됨.
  // key는 라벨을 바꿔도 유지되도록 고정 문자열로 둔다.
  checklist: [
    {
      group: "필수 확인",
      items: [
        { key: "passport", label: "여권 (유효기간 6개월 이상 남았는지)" },
        { key: "vjw", label: "Visit Japan Web 등록·심사 QR 발급", url: "https://services.digital.go.jp/ko/visit-japan-web/" },
        { key: "boarding", label: "항공권 / 모바일 탑승권 확인" },
        { key: "stay", label: "숙소 예약·체크인 방법 저장 (오프라인 대비)" },
        { key: "esim", label: "해외 데이터 (eSIM / 로밍)" },
        { key: "money", label: "해외결제 카드 + 엔화 현금" },
        { key: "insurance", label: "여행자 보험" },
        { key: "offline-map", label: "구글맵 도쿄 오프라인 지도 다운로드" },
      ],
    },
    {
      group: "짐",
      items: [
        { key: "clothes", label: "여벌 옷 (일수 + 1)" },
        { key: "shoes", label: "걷기 편한 신발" },
        { key: "charger", label: "충전기 · 케이블 · 보조배터리" },
        { key: "plug", label: "변환 플러그 (일본 A타입 · 100V)" },
        { key: "toiletries", label: "세면도구 · 화장품 · 선크림" },
        { key: "meds", label: "상비약 (두통 · 소화 · 밴드)" },
        { key: "bags", label: "비닐봉투 몇 장 (빨래 · 젖은 옷)" },
        { key: "ecobag", label: "에코백 (장보기 · 쇼핑)" },
        { key: "umbrella", label: "접이 우산 / 우비" },
        { key: "dryer", label: "드라이기 — 숙소에 있는지 먼저 확인" },
      ],
    },
  ],

  // 일자별 계획: 시간표가 아니라 "지역 → 후보 장소" 구조. 순서는 느슨한 가이드.
  // priority: "must"(꼭) | "want"(가고싶음) | "maybe"(여유되면)
  // category: "food" | "cafe" | "shopping" | "sight" | "activity" | "transport"
  days: [
    {
      date: "2026-09-10",
      title: "1일차 · 도착 & 정착",
      note: "오후·저녁 도착. 무리하지 말고 숙소 주변만 가볍게.",
      areas: [
        {
          name: "신주쿠",
          coords: { lat: 35.6896, lng: 139.7006 },
          note: "숙소 인근. 저녁 식사 + 산책.",
          places: [
            { name: "오모이데 요코초", category: "food", priority: "want", coords: { lat: 35.6935, lng: 139.6996 }, note: "야키토리 골목" },
            { name: "돈키호테 신주쿠 히가시구치점", category: "shopping", priority: "maybe", coords: { lat: 35.6919, lng: 139.7053 }, note: "심야 쇼핑" },
            { name: "신주쿠 교엔", category: "sight", priority: "maybe", coords: { lat: 35.6852, lng: 139.7100 }, note: "시간·체력 남으면" },
          ],
        },
      ],
    },
    {
      date: "2026-09-11",
      title: "2일차 · 하라주쿠 / 시부야",
      note: "쇼핑 데이. 동선: 하라주쿠 → 오모테산도 → 시부야.",
      areas: [
        {
          name: "하라주쿠 · 오모테산도",
          coords: { lat: 35.6702, lng: 139.7027 },
          places: [
            { name: "다케시타 거리", category: "shopping", priority: "want", coords: { lat: 35.6716, lng: 139.7050 } },
            { name: "오모테산도 힐즈", category: "shopping", priority: "maybe", coords: { lat: 35.6659, lng: 139.7118 } },
          ],
        },
        {
          name: "시부야",
          coords: { lat: 35.6595, lng: 139.7005 },
          places: [
            { name: "시부야 스크램블 스퀘어 (전망대)", category: "sight", priority: "want", coords: { lat: 35.6580, lng: 139.7016 } },
            { name: "미야시타 파크", category: "shopping", priority: "maybe", coords: { lat: 35.6614, lng: 139.7009 } },
          ],
        },
      ],
    },
    {
      date: "2026-09-12",
      title: "3일차 · 아사쿠사 / 우에노",
      note: "구도심. 오전 일찍 아사쿠사, 오후 우에노.",
      areas: [
        {
          name: "아사쿠사",
          coords: { lat: 35.7148, lng: 139.7967 },
          places: [
            { name: "센소지", category: "sight", priority: "must", coords: { lat: 35.7148, lng: 139.7967 } },
            { name: "나카미세 거리", category: "shopping", priority: "want", coords: { lat: 35.7119, lng: 139.7960 } },
          ],
        },
        {
          name: "우에노",
          coords: { lat: 35.7138, lng: 139.7770 },
          places: [
            { name: "아메요코 시장", category: "food", priority: "want", coords: { lat: 35.7089, lng: 139.7745 } },
          ],
        },
      ],
    },
    {
      date: "2026-09-13",
      title: "4일차 · 귀국",
      note: "체크아웃 10:00. 공항 이동은 여유있게.",
      areas: [],
    },
  ],
};
