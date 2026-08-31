// 여행 데이터. 확정되지 않은 값은 "TODO"로 표시되어 있으니 채워넣으면 됩니다.
// 좌표(coords)가 null이면 지도 버튼은 "현재 위치 기준" 또는 이름 검색으로 동작합니다.

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
  flights: [
    {
      kind: "outbound",
      date: "2026-09-10",
      airline: "TODO 항공사",
      flightNo: "TODO 편명",
      bookingRef: "TODO 예약번호",
      depart: {
        airport: "ICN",
        name: "인천국제공항 제1여객터미널",
        terminal: "TODO (T1 / T2)",
        time: "2026-09-10T00:00", // TODO 출발 시각
        coords: { lat: 37.4483, lng: 126.4517 },
      },
      arrive: {
        airport: "NRT",
        name: "나리타 국제공항",
        terminal: "TODO",
        time: "2026-09-10T00:00", // TODO 도착 시각
        coords: { lat: 35.7719, lng: 140.3929 },
      },
    },
    {
      kind: "inbound",
      date: "2026-09-13",
      airline: "TODO 항공사",
      flightNo: "TODO 편명",
      bookingRef: "TODO 예약번호",
      depart: {
        airport: "NRT",
        name: "Narita Airport",
        terminal: "TODO",
        time: "2026-09-13T00:00", // TODO 출발 시각
        coords: { lat: 35.7719, lng: 140.3929 },
      },
      arrive: {
        airport: "ICN",
        name: "인천국제공항 제1여객터미널",
        terminal: "TODO",
        time: "2026-09-13T00:00", // TODO 도착 시각
        coords: { lat: 37.4483, lng: 126.4517 },
      },
    },
  ],

  // 숙소 (에어비앤비)
  accommodation: {
    name: "에어비앤비",
    area: "TODO 지역 (예: 신주쿠)",
    address: "TODO 상세 주소",
    coords: null, // { lat, lng } — 채워넣으면 지도/길찾기 버튼이 정확해집니다
    checkIn: "2026-09-10T15:00",
    checkOut: "2026-09-13T10:00",
    url: "TODO 에어비앤비 예약 링크",
    notes: "체크인 방법 · 도어락 · 와이파이 등 메모",
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
