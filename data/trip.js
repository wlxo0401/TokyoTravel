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
  //   { kind: "move",  label, mins?, note?, walk? }                       — 이동 구간 (walk:true면 도보 아이콘)
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
          walk: true,
          label: "긴자 → 유라쿠초",
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
      title: "2일차 · 가와구치코(후지산) 당일치기",
      note: [
        "아침에 날씨 보고 결정 — 후지산이 보일 것 같으면 가고, 흐리면 시내(하라주쿠·시부야 등)로 대체.",
        "예약 안 해도 오쓰키역에서 딱 1번만 갈아타면 언제든 왕복 가능. 직통 특급(후지카이유)·고속버스는 매진 잦으니 표 없으면 아래 환승 경로로.",
      ],
      flow: [
        {
          kind: "move",
          label: "숙소(히가시신주쿠) → 신주쿠역",
          mins: 15,
          note: "후쿠토신·오에도선 1정거장 또는 도보 12~15분.",
        },
        {
          kind: "move",
          label: "신주쿠 → 오쓰키(大月) · JR 주오선",
          note: [
            "① 특급 아즈사/카이지 — 약 1시간. 전 좌석 지정이지만 '좌석 미지정권'으로 타서 좌석 위 램프가 빨간(빈) 자리에 앉으면 됨. 신주쿠역 매표기·창구에서 자리 있는지 먼저 확인.",
            "② 매진이면 일반 주오선 쾌속/특쾌 — '오쓰키(大月)행' 또는 '고후(甲府)행' 승강장에서 오는 대로 탑승. 약 1시간 30분, 예약 없음, 교통카드로.",
          ],
        },
        {
          kind: "move",
          label: "오쓰키 → 가와구치코 · 후지급행선(富士急行線) 보통열차",
          mins: 55,
          note: "오쓰키역에서 안내판 따라 후지급행선 승강장으로. 예약 없는 보통열차, 스이카/파스모로 개찰구 터치하고 탑승(JR 구간 요금은 그때 정산). 배차 30~40분 간격.",
        },
        {
          kind: "stop",
          area: "가와구치코 (후지산)",
          coords: { lat: 35.5008, lng: 138.7663 },
          note: "역 코인락커에 짐 보관 가능. 호수·공원은 역에서 레트로 버스·옴니 버스로 이동. 후지산 뷰는 날씨 영향이 큼.",
          items: [
            { text: "오이시 공원(大石公園) — 호수 북쪽, 호수 건너 후지산 정면 뷰 + 꽃길. 역에서 버스 약 25분", place: "大石公園 Oishi Park", coords: { lat: 35.5252, lng: 138.7566 } },
            { text: "후지산 파노라마 로프웨이 (텐조야마 전망대) — 3분이면 해발 1,075m, 호수·후지산 파노라마. 줄이 길면 옆 텐조야마 산책로(아지사이 하이킹코스)로 걸어 올라가도 됨(약 30~40분)", place: "富士山パノラマロープウェイ", coords: { lat: 35.5045, lng: 138.7626 } },
            { text: "가와구치코 유람선 · 호숫가 산책", place: "河口湖遊覧船", coords: { lat: 35.5057, lng: 138.7595 } },
          ],
        },
        {
          kind: "move",
          label: "가와구치코 → 오쓰키 → 신주쿠 (귀가)",
          note: [
            "가와구치코역에서 오쓰키행 보통열차 → 오쓰키에서 신주쿠행 JR(특급이든 일반이든 오는 대로).",
            "총 편도 약 2~2시간 40분. 돌아올 때도 예약 불필요.",
          ],
        },
      ],
    },
    {
      date: "2026-09-12",
      title: "3일차 · 하라주쿠 · 오모테산도 · 시부야 (도보 위주)",
      note: "구간 거리가 짧고 걷기 좋은 길. 하라주쿠→오모테산도→시부야 전체 약 2.5km, 매장 구경·카페 쉬며 걷는 게 지하철보다 효율적이고 거리 분위기 즐기기 좋음.",
      flow: [
        {
          kind: "move",
          label: "숙소 → 신주쿠역",
          note: "도보 약 15~20분(1.2km)이면 아침 산책 겸 걷기 딱 좋음. 전철이면 JR 신오쿠보→신주쿠 또는 지하철 히가시신주쿠→신주쿠산초메 1정거장(약 2분).",
        },
        {
          kind: "move",
          label: "신주쿠 → 하라주쿠 · JR 야마노테선",
          mins: 4,
        },
        {
          kind: "stop",
          area: "하라주쿠 · 캣스트리트",
          coords: { lat: 35.6702, lng: 139.7027 },
          note: "하라주쿠역 동쪽 출구로 나오면 바로 타케시타 거리. 입구부터 끝까지 구경하며 내려가면 자연스럽게 캣스트리트·오모테산도 방향으로 연결.",
          items: [
            { text: "타케시타 거리 — 역 동쪽 출구 바로 앞. 도보 5~10분(500m)이면 캣스트리트 입구까지", place: "타케시타 거리", coords: { lat: 35.6716, lng: 139.7050 } },
            { text: "캣스트리트 — 빈티지샵·옷가게·카페 구경하며 오모테산도 쪽으로", place: "하라주쿠 캣스트리트", coords: { lat: 35.6685, lng: 139.7060 } },
          ],
        },
        {
          kind: "move",
          walk: true,
          label: "캣스트리트 → 오모테산도",
          mins: 13,
          note: "약 650m. 양옆 상점 구경하다 보면 오모테산도 메인 도로(명품 거리)로 나옴.",
        },
        {
          kind: "stop",
          area: "오모테산도",
          coords: { lat: 35.6659, lng: 139.7118 },
          items: [
            { text: "오모테산도 힐즈", place: "오모테산도 힐즈", coords: { lat: 35.6659, lng: 139.7118 } },
            { text: "오모테산도 가로수길 · 명품 거리 산책", place: "오모테산도", coords: { lat: 35.6664, lng: 139.7126 } },
          ],
        },
        {
          kind: "move",
          walk: true,
          label: "오모테산도 → 시부야",
          mins: 18,
          note: [
            "약 1.5km. 메이지도리 큰길 따라 직선으로 가면 길 찾기 가장 쉬움.",
            "또는 캣스트리트 남쪽(미야시타 파크 방향) 상점가 구경하며 내려가도 시부야 스크램블까지 연결.",
            "다리 아프면 오모테산도역에서 긴자선/한조몬선으로 시부야 1정거장(약 2분).",
          ],
        },
        {
          kind: "stop",
          area: "시부야",
          coords: { lat: 35.6595, lng: 139.7005 },
          items: [
            { text: "시부야 스크램블 교차로", place: "시부야 스크램블 교차로", coords: { lat: 35.6595, lng: 139.7004 } },
            { text: "시부야 스크램블 스퀘어 (전망대 SHIBUYA SKY)", place: "시부야 스크램블 스퀘어", coords: { lat: 35.6580, lng: 139.7016 } },
            { text: "미야시타 파크", place: "미야시타 파크", coords: { lat: 35.6614, lng: 139.7009 } },
          ],
        },
        {
          kind: "move",
          label: "시부야 → 숙소(신오쿠보) · JR 야마노테선",
          mins: 9,
          note: "환승 없음.",
        },
      ],
    },
    {
      date: "2026-09-13",
      title: "4일차 · 도쿄역·고쿄·긴자, 그리고 귀국",
      note: "도쿄역 ↔ 고쿄 ↔ 긴자가 전부 도보 10~15분. 거점인 도쿄역에 짐 맡기고 도보로만 도는 코스. 공항 이동도 도쿄역에서.",
      flow: [
        { kind: "checkout" },
        {
          kind: "move",
          label: "숙소(신오쿠보) → 도쿄역 · JR 야마노테선",
          mins: 20,
        },
        {
          kind: "stop",
          area: "도쿄역 (짐 보관)",
          coords: { lat: 35.6812, lng: 139.7671 },
          note: "도쿄역 코인락커·짐 보관소에 캐리어 맡기기. 귀국 때 여기서 스카이라이너(우에노 경유)나 공항버스(야에스 출구) 타기 편함.",
          items: [
            { text: "코인락커 / 짐 보관소에 캐리어 맡기기" },
          ],
        },
        {
          kind: "move",
          walk: true,
          label: "도쿄역 → 고쿄(황거)",
          mins: 12,
          note: "약 800m. 마루노우치 광장 출구로 나와 빌딩 숲을 지나 고쿄 쪽으로.",
        },
        {
          kind: "stop",
          area: "고쿄 (황거)",
          coords: { lat: 35.6802, lng: 139.7549 },
          items: [
            { text: "고쿄 외원 잔디밭 · 니주바시(안경다리) 포토스팟", place: "二重橋 니주바시", coords: { lat: 35.6797, lng: 139.7546 } },
            { text: "다이쇼·쇼와 시대 석조 건물 구경" },
          ],
        },
        {
          kind: "move",
          walk: true,
          label: "고쿄 → 도쿄역 마루노우치",
          mins: 10,
          note: "약 700m.",
        },
        {
          kind: "stop",
          area: "도쿄역 · 마루노우치",
          coords: { lat: 35.6813, lng: 139.7660 },
          items: [
            { text: "붉은 벽돌 역사(丸の内駅舎) · 마루노우치 광장에서 기념사진", place: "東京駅 마루노우치 역사", coords: { lat: 35.6813, lng: 139.7660 } },
            { text: "마루빌딩·신마루빌딩 또는 역 지하 '도쿄 라멘 스트리트'에서 점심", place: "東京ラーメンストリート", coords: { lat: 35.6793, lng: 139.7690 } },
          ],
        },
        {
          kind: "move",
          walk: true,
          label: "도쿄역 → 긴자",
          mins: 18,
          note: "약 1.2km. 보행자 도로가 잘 돼 있음. 걷기 부담되면 지하철 다카라초 또는 긴자선 1정거장.",
        },
        {
          kind: "stop",
          area: "긴자 (낮)",
          coords: { lat: 35.6717, lng: 139.7650 },
          note: "주말(토·일) 낮이면 메인 도로가 '보행자 천국'(차 없는 거리)으로 운영.",
          items: [
            { text: "GINZA SIX · 미츠코시 백화점 · 유니클로 긴자 플래그십", place: "GINZA SIX", coords: { lat: 35.6695, lng: 139.7638 } },
            { text: "디저트 카페·찻집에서 한 템포 쉬기" },
          ],
        },
        {
          kind: "move",
          walk: true,
          label: "긴자 → 도쿄역 복귀 (짐 찾기)",
          mins: 15,
          note: "약 1.2km.",
        },
        {
          kind: "move",
          label: "도쿄역 → 나리타 공항",
          note: [
            "① 스카이라이너: 도쿄역 → 우에노역(JR 약 7분) → 우에노에서 스카이라이너 약 40분.",
            "② 공항버스: 도쿄역 야에스 출구에서 나리타행 직통 약 1시간~1시간 10분(1,500엔대).",
            "LJ212 19:15 출발 → 2시간 전 도착 목표. 도쿄역은 16:30쯤 출발 권장.",
          ],
        },
      ],
    },
  ],
};
