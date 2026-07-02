import { crumb, whw, baseFaq, LAST_UPDATED, OG } from "./_helpers.mjs";

// 생활권 상세페이지 정의. 각 항목은 고유 overview / lifeNote / nearbyNote / useNote 보유.
const raw = [
  // ---------------- 인천 ----------------
  {
    slug: "songdo-international-city", region: "incheon", regionLabel: "인천",
    title: "송도국제도시 생활권 안내｜인천 방문 전 확인 · 간다GO",
    description: "송도 신도시·오피스텔·업무지구 방문 전 주소·출입·이동 기준을 안내합니다.",
    h1: "송도국제도시 생활권 안내",
    keywords: ["송도 출장마사지", "송도 홈타이", "인천 연수구 생활권"],
    overview: "송도국제도시는 인천 연수구에 자리한 대규모 계획 신도시로, 고층 오피스텔과 아파트, 국제업무지구, 대학·컨벤션 시설이 밀집한 생활권입니다. 방문형 서비스를 이용할 때는 단지와 오피스텔이 많은 특성상 정확한 동·호수와 공동현관 출입 방식을 먼저 확인하는 것이 중요합니다.",
    parentNote: "행정구역상 연수구에 속하며, 인천대입구역·센트럴파크역·국제업무지구역 등 인천1호선 역세권과 함께 확인하면 위치를 더 정확히 안내받을 수 있습니다.",
    lifeNote: "송도는 업무지구와 주거지가 나뉘어 있어 방문 위치가 업무용 오피스텔인지 주거용 아파트인지에 따라 출입 방식이 다릅니다. 해안을 따라 시흥 배곧·월곶 생활권과도 가까워, 인접 이동권을 함께 확인하면 예약이 수월합니다.",
    nearbyNote: "가까운 역은 인천대입구역·센트럴파크역이며, 해안 방향으로는 송도·배곧 연결 생활권으로 이어집니다. 자동차 이동 시 제3연륙교·아암대로 방향 이동 기준을 함께 확인하세요.",
    useNote: "송도는 오피스텔·비즈니스호텔 비중이 높아 객실·공동현관 출입 규정 확인이 특히 중요한 생활권입니다.",
    areaTypeNote: "국제업무지구의 비즈니스호텔을 이용할 경우, 숙소의 방문객 정책과 객실 층·호수를 미리 확인하면 방문이 원활합니다.",
    links: [{ title: "인천·인접 생활권", items: [
      { label: "구월·인천시청 생활권 안내", url: "/incheon/life/guwol-incheon-cityhall/" },
      { label: "송도·배곧 연결 생활권 보기", url: "/corridor/songdo-baegot/" },
      { label: "인천대입구역 주변 확인", url: "/station/incheon-univ-station/" },
      { label: "호텔·숙소 이용 전 확인", url: "/use/hotel/" }
    ]}]
  },
  {
    slug: "guwol-incheon-cityhall", region: "incheon", regionLabel: "인천",
    title: "구월·인천시청 생활권 안내｜남동구 방문 전 확인 · 간다GO",
    description: "구월·인천시청 상권과 남동구 주거지 방문 전 확인사항을 안내합니다.",
    h1: "구월·인천시청 생활권 안내",
    keywords: ["구월 출장마사지", "인천시청 홈타이", "남동구 생활권"],
    overview: "구월동과 인천시청 일대는 인천 남동구의 행정·상업 중심으로, 관공서와 대형 상권, 오래된 주거지가 함께 있는 생활권입니다. 상권 구역과 주거 구역이 붙어 있어 방문 위치가 상가 건물인지 주거 단지인지에 따라 출입 방식이 달라집니다.",
    parentNote: "행정구역상 남동구에 속하며, 인천시청역·예술회관역·구월역 등 인천1호선 역세권과 함께 확인하기 좋습니다.",
    lifeNote: "구월은 남동구 논현·만수 생활권으로 이어지고, 해안 방향으로는 시흥 월곶 생활권과의 인접 이동권을 함께 볼 수 있습니다.",
    nearbyNote: "가까운 역은 인천시청역·구월역이며, 남동권에서 시흥 월곶 방향으로는 구월·월곶 연결 생활권으로 이어집니다.",
    useNote: "구월은 상가 밀집 지역이 많아 상가 건물의 야간 출입·엘리베이터 운영 시간을 확인해야 하는 생활권입니다.",
    links: [{ title: "인천·연결 생활권", items: [
      { label: "송도국제도시 생활권 안내", url: "/incheon/life/songdo-international-city/" },
      { label: "구월·월곶 연결 생활권 보기", url: "/corridor/guwol-wolgot/" },
      { label: "인천시청역 주변 확인", url: "/station/incheon-cityhall-station/" },
      { label: "오피스텔 이용 전 확인", url: "/use/officetel/" }
    ]}]
  },
  {
    slug: "bupyeong-station-market", region: "incheon", regionLabel: "인천",
    title: "부평역·부평시장 생활권 안내｜부평구 방문 전 확인 · 간다GO",
    description: "부평역·부평시장 상권과 부천 상동 인접권 방문 전 확인을 안내합니다.",
    h1: "부평역·부평시장 생활권 안내",
    keywords: ["부평 출장마사지", "부평 홈타이", "부평역 생활권"],
    overview: "부평역과 부평시장 일대는 인천 부평구의 대표 상권이자 교통 거점으로, 1호선과 인천1호선이 만나는 환승 지역입니다. 유동 인구가 많고 상가·주거가 섞여 있어 방문 위치와 건물 출입 방식을 정확히 확인하는 것이 중요합니다.",
    parentNote: "행정구역상 부평구에 속하며, 부평역·부평구청역·부평시장역 등 역세권과 함께 확인하기 좋습니다.",
    lifeNote: "부평은 부천 상동·중동 생활권과 지리적으로 매우 가까워, 도시 경계를 넘는 부평·상동 연결 생활권을 함께 확인하면 위치 안내가 정확해집니다.",
    nearbyNote: "가까운 역은 부평역·부평구청역이며, 부천 방향으로는 부평·상동 연결 생활권으로 이어집니다.",
    useNote: "부평은 상가 건물과 오래된 주거지가 혼재해, 공동현관과 야간 출입 방식 확인이 특히 필요한 생활권입니다.",
    links: [{ title: "인천·연결 생활권", items: [
      { label: "부평·상동 연결 생활권 보기", url: "/corridor/bupyeong-sangdong/" },
      { label: "부평역 주변 확인", url: "/station/bupyeong-station/" },
      { label: "부천 상동·부천시청 생활권", url: "/bucheon/life/sangdong-bucheon-cityhall/" },
      { label: "역세권 이용 전 확인", url: "/use/station-area/" }
    ]}]
  },
  {
    slug: "cheongna-seohae", region: "incheon", regionLabel: "인천",
    title: "청라·서해권 생활권 안내｜인천 신도시 방문 전 확인 · 간다GO",
    description: "청라국제도시·서해권 신도시 방문 전 주소·이동·출입 기준을 안내합니다.",
    h1: "청라·서해권 생활권 안내",
    keywords: ["청라 출장마사지", "청라 홈타이", "인천 서해권 생활권"],
    overview: "청라국제도시는 인천 서부 서해권에 조성된 신도시로, 대규모 아파트 단지와 상업지구, 호수공원 일대가 함께 있는 생활권입니다. 단지가 넓게 퍼져 있어 정확한 단지명과 동·호수, 공동현관 출입 방식을 미리 확인하는 것이 좋습니다.",
    parentNote: "인천 행정체제 개편에 따라 관할 구역 명칭이 변동될 수 있으므로, 최신 행정구역 기준으로 위치를 확인합니다.",
    lifeNote: "청라는 검단신도시·서구 생활권과 이어지며, 신도시 특성상 이동 거리가 길어 추가 이동비 기준을 함께 확인하는 것이 좋습니다.",
    nearbyNote: "청라는 광역·간선버스 이용 비중이 높은 신도시로, 자동차 이동 기준과 소요 시간을 사전에 확인하세요.",
    useNote: "청라는 신축 아파트·오피스텔이 많아 공동현관 비밀번호와 방문객 등록 절차를 확인해야 하는 생활권입니다.",
    links: [{ title: "인천 신도시 생활권", items: [
      { label: "검단신도시 생활권 안내", url: "/incheon/life/geomdan-newtown/" },
      { label: "신도시 생활권 이용 전 확인", url: "/use/newtown/" },
      { label: "추가 이동비 기준", url: "/check/travel-fee/" }
    ]}]
  },
  {
    slug: "geomdan-newtown", region: "incheon", regionLabel: "인천",
    title: "검단신도시 생활권 안내｜인천 방문 전 확인 · 간다GO",
    description: "검단신도시 신축 단지 방문 전 주소·출입·행정개편 확인을 안내합니다.",
    h1: "검단신도시 생활권 안내",
    keywords: ["검단 출장마사지", "검단신도시 홈타이", "인천 검단 생활권"],
    overview: "검단신도시는 인천 북서부에 조성 중인 대규모 신도시로, 신축 아파트와 상업시설이 빠르게 들어서고 있는 생활권입니다. 단지가 새로 조성되는 지역인 만큼, 도로명 주소와 단지명이 최신인지 확인하는 것이 중요합니다.",
    parentNote: "인천 행정체제 개편으로 관할 구·명칭이 변경될 수 있어, 방문 시 최신 행정구역 기준을 확인합니다.",
    lifeNote: "검단은 청라·서해권 생활권과 김포 인접권으로 이어지며, 신도시 외곽 특성상 이동 시간이 길 수 있습니다.",
    nearbyNote: "검단은 인천1호선 연장 구간과 광역버스 이용이 많아, 자동차 이동 기준과 소요 시간을 사전에 확인하세요.",
    useNote: "검단은 신축 단지가 많아 공동현관·주차 등록·방문객 절차를 미리 확인해야 하는 생활권입니다.",
    links: [{ title: "인천 신도시 생활권", items: [
      { label: "청라·서해권 생활권 안내", url: "/incheon/life/cheongna-seohae/" },
      { label: "신도시 생활권 이용 전 확인", url: "/use/newtown/" },
      { label: "외곽 지역 이용 전 확인", url: "/use/outer-area/" }
    ]}]
  },
  {
    slug: "incheon-airport", region: "incheon", regionLabel: "인천",
    title: "인천공항 생활권 안내｜영종·공항권 방문 전 확인 · 간다GO",
    description: "인천공항·영종 숙소권 방문 전 이동 시간·숙소 정책 확인을 안내합니다.",
    h1: "인천공항·영종 공항권 생활권 안내",
    keywords: ["인천공항 출장마사지", "영종도 홈타이", "공항 숙소 생활권"],
    overview: "인천공항과 영종·운서 일대는 공항 종사자와 여행객이 이용하는 숙소가 밀집한 공항권 생활권입니다. 공항권은 이동 거리가 길고 숙소 정책이 제각각이라, 예약 전 숙소의 객실 방문 가능 여부와 이동 시간을 반드시 확인해야 합니다.",
    parentNote: "행정구역상 영종 지역에 속하며, 운서역·인천공항1터미널역 등 공항철도 역세권과 함께 확인합니다.",
    lifeNote: "공항권은 도심과 떨어져 있어 이동 시간이 길고 추가 이동비가 발생하기 쉬운 생활권입니다. 숙소 이용 시 프런트 방문객 정책을 먼저 확인하세요.",
    nearbyNote: "가까운 역은 운서역·인천공항1터미널역이며, 자동차 이동 시 영종대교·인천대교 경로와 소요 시간을 사전에 확인합니다.",
    useNote: "공항권은 호텔·비즈니스호텔 이용 비중이 매우 높아, 숙소 정책과 객실 방문 규정 확인이 핵심인 생활권입니다.",
    areaTypeNote: "공항권 호텔은 층별 카드키 제한이 있는 경우가 많아, 프런트를 통한 방문 절차를 미리 확인하면 원활합니다.",
    links: [{ title: "공항권·이용 장소", items: [
      { label: "공항권 이용 전 확인", url: "/use/airport-area/" },
      { label: "호텔·숙소 이용 전 확인", url: "/use/hotel/" },
      { label: "운서역 주변 확인", url: "/station/unseo-station/" }
    ]}]
  },

  // ---------------- 부천 ----------------
  {
    slug: "jungdong-sinjungdong", region: "bucheon", regionLabel: "부천",
    title: "중동·신중동 생활권 안내｜원미구 방문 전 확인 · 간다GO",
    description: "중동·신중동 상권과 부천시청 인접 생활권 방문 전 확인을 안내합니다.",
    h1: "중동·신중동 생활권 안내",
    keywords: ["중동 출장마사지", "신중동 홈타이", "부천 원미구 생활권"],
    overview: "중동·신중동은 부천 원미구의 대표 상업·주거 중심으로, 백화점과 대형 상권, 고층 주거단지가 밀집한 생활권입니다. 7호선 신중동역·부천시청역을 낀 역세권이라 유동 인구가 많고, 방문 위치가 상가인지 주거단지인지 확인이 필요합니다.",
    parentNote: "행정구역상 원미구에 속하며, 신중동역·부천시청역·상동역 등 7호선 역세권과 함께 확인하기 좋습니다.",
    lifeNote: "중동은 상동·부천시청 생활권과 바로 이어지고, 인천 부평 방향으로는 부평·상동 연결 생활권과 가깝습니다.",
    nearbyNote: "가까운 역은 신중동역·부천시청역이며, 상동 방향으로 상동·부천시청 생활권으로 이어집니다.",
    useNote: "중동은 고층 오피스텔·주상복합이 많아 공동현관·엘리베이터 카드키 확인이 필요한 생활권입니다.",
    links: [{ title: "부천·연결 생활권", items: [
      { label: "상동·부천시청 생활권 안내", url: "/bucheon/life/sangdong-bucheon-cityhall/" },
      { label: "부평·상동 연결 생활권 보기", url: "/corridor/bupyeong-sangdong/" },
      { label: "신중동역 주변 확인", url: "/station/sinjungdong-station/" },
      { label: "오피스텔 이용 전 확인", url: "/use/officetel/" }
    ]}]
  },
  {
    slug: "sangdong-bucheon-cityhall", region: "bucheon", regionLabel: "부천",
    title: "상동·부천시청 생활권 안내｜원미구 방문 전 확인 · 간다GO",
    description: "상동·부천시청 상권과 인천 부평 인접권 방문 전 확인을 안내합니다.",
    h1: "상동·부천시청 생활권 안내",
    keywords: ["상동 출장마사지", "부천시청 홈타이", "부천 상동 생활권"],
    overview: "상동과 부천시청 일대는 부천 원미구의 행정·상업 중심으로, 시청과 대형 쇼핑시설, 주거단지가 함께 있는 생활권입니다. 상동역·부천시청역을 낀 7호선 역세권으로 인천 부평과의 접근성이 좋습니다.",
    parentNote: "행정구역상 원미구에 속하며, 상동역·부천시청역 역세권과 함께 확인하기 좋습니다.",
    lifeNote: "상동은 인천 부평·삼산 생활권과 가장 강하게 이어지는 지역으로, 부평·상동 연결 생활권을 함께 확인하면 위치 안내가 정확해집니다.",
    nearbyNote: "가까운 역은 상동역·부천시청역이며, 인천 방향으로는 부평·상동 연결 생활권으로 이어집니다.",
    useNote: "상동은 주상복합·오피스텔 비중이 높아 공동현관·방문 가능 시간대 확인이 필요한 생활권입니다.",
    links: [{ title: "부천·연결 생활권", items: [
      { label: "중동·신중동 생활권 안내", url: "/bucheon/life/jungdong-sinjungdong/" },
      { label: "부평·상동 연결 생활권 보기", url: "/corridor/bupyeong-sangdong/" },
      { label: "상동역 주변 확인", url: "/station/sangdong-station/" }
    ]}]
  },
  {
    slug: "bucheon-station-simgok", region: "bucheon", regionLabel: "부천",
    title: "부천역·심곡 생활권 안내｜소사·원미 방문 전 확인 · 간다GO",
    description: "부천역·심곡 상권과 소사·원미 생활권 방문 전 확인을 안내합니다.",
    h1: "부천역·심곡 생활권 안내",
    keywords: ["부천역 출장마사지", "심곡동 홈타이", "부천역 생활권"],
    overview: "부천역과 심곡 일대는 1호선 부천역을 중심으로 형성된 부천의 오래된 상권이자 교통 거점입니다. 상가와 주거가 촘촘히 섞여 있어, 방문 위치와 건물 출입 방식을 정확히 확인하는 것이 특히 중요합니다.",
    parentNote: "행정구역상 원미구 심곡동 일대에 속하며, 부천역·소사역과 함께 확인하기 좋습니다.",
    lifeNote: "부천역은 송내·역곡 생활권과 이어지고, 소사 방향으로는 소사·소사본 생활권과 가깝습니다.",
    nearbyNote: "가까운 역은 부천역이며, 송내 방향으로는 부천역·송내 연결 생활권으로 이어집니다.",
    useNote: "부천역 일대는 오래된 상가·주거가 많아 공동현관 방식이 다양하므로, 건물 출입 방식을 사전에 확인해야 합니다.",
    links: [{ title: "부천·연결 생활권", items: [
      { label: "부천역·송내 연결 생활권 보기", url: "/corridor/bucheon-station-songnae/" },
      { label: "송내 생활권 안내", url: "/bucheon/life/songnae/" },
      { label: "부천역 주변 확인", url: "/station/bucheon-station/" }
    ]}]
  },
  {
    slug: "songnae", region: "bucheon", regionLabel: "부천",
    title: "송내 생활권 안내｜소사구 방문 전 확인 · 간다GO",
    description: "송내역 주변 주거·상권과 인접 이동권 방문 전 확인을 안내합니다.",
    h1: "송내 생활권 안내",
    keywords: ["송내 출장마사지", "송내동 홈타이", "부천 송내 생활권"],
    overview: "송내는 1호선 송내역을 중심으로 형성된 부천 소사구의 주거·상업 생활권입니다. 서울·인천 방향 접근성이 좋아 유동 인구가 많고, 아파트 단지와 상가가 함께 있어 방문 위치 확인이 필요합니다.",
    parentNote: "행정구역상 소사구에 속하며, 송내역·중동역과 함께 확인하기 좋습니다.",
    lifeNote: "송내는 부천역·중동 생활권과 이어지며, 인천 부평 방향 이동권도 함께 볼 수 있습니다.",
    nearbyNote: "가까운 역은 송내역이며, 부천역 방향으로는 부천역·송내 연결 생활권으로 이어집니다.",
    useNote: "송내는 아파트 단지 비중이 높아 공동현관 비밀번호와 방문객 등록 절차 확인이 필요한 생활권입니다.",
    links: [{ title: "부천·연결 생활권", items: [
      { label: "부천역·송내 연결 생활권 보기", url: "/corridor/bucheon-station-songnae/" },
      { label: "부천역·심곡 생활권 안내", url: "/bucheon/life/bucheon-station-simgok/" },
      { label: "송내역 주변 확인", url: "/station/songnae-station/" }
    ]}]
  },
  {
    slug: "yeokgok", region: "bucheon", regionLabel: "부천",
    title: "역곡 생활권 안내｜소사구 방문 전 확인 · 간다GO",
    description: "역곡역 주변 주거·대학가와 서울·소사 인접권 확인을 안내합니다.",
    h1: "역곡 생활권 안내",
    keywords: ["역곡 출장마사지", "역곡동 홈타이", "부천 역곡 생활권"],
    overview: "역곡은 1호선 역곡역을 중심으로 대학가와 주거지가 형성된 부천 소사구의 생활권으로, 서울 구로·인천 부평과 가까운 경계 지역입니다. 원룸·다세대와 아파트가 섞여 있어 방문 위치 확인이 필요합니다.",
    parentNote: "행정구역상 소사구에 속하며, 역곡역·소사역과 함께 확인하기 좋습니다.",
    lifeNote: "역곡은 소사·소사본 생활권과 이어지고, 서울 구로·인천 부평 인접 이동권을 함께 확인할 수 있습니다.",
    nearbyNote: "가까운 역은 역곡역이며, 소사 방향으로는 역곡·소사 연결 생활권으로 이어집니다.",
    useNote: "역곡은 다세대·원룸 비중이 높아 공동현관과 호수 확인이 특히 중요한 생활권입니다.",
    links: [{ title: "부천·연결 생활권", items: [
      { label: "역곡·소사 연결 생활권 보기", url: "/corridor/yeokgok-sosa/" },
      { label: "소사·소사본 생활권 안내", url: "/bucheon/life/sosa-sosabon/" },
      { label: "역곡역 주변 확인", url: "/station/yeokgok-station/" }
    ]}]
  },
  {
    slug: "sosa-sosabon", region: "bucheon", regionLabel: "부천",
    title: "소사·소사본 생활권 안내｜소사구 방문 전 확인 · 간다GO",
    description: "소사역 주변 주거지와 서해선·1호선 인접 이동권 확인을 안내합니다.",
    h1: "소사·소사본 생활권 안내",
    keywords: ["소사 출장마사지", "소사본동 홈타이", "부천 소사 생활권"],
    overview: "소사와 소사본동은 부천 소사구의 주거 중심 생활권으로, 1호선과 서해선이 만나는 소사역을 낀 지역입니다. 주택가와 상가가 섞여 있어 방문 위치와 건물 출입 방식을 사전에 확인하는 것이 좋습니다.",
    parentNote: "행정구역상 소사구에 속하며, 소사역·역곡역과 함께 확인하기 좋습니다. 소사역은 환승역이지만 노선별로 나누지 않고 역명 기준 1개 페이지로 안내합니다.",
    lifeNote: "소사는 역곡·범박·옥길 생활권과 이어지며, 서해선을 통해 시흥 방향 이동권과도 연결됩니다.",
    nearbyNote: "가까운 역은 소사역이며, 역곡 방향으로는 역곡·소사 연결 생활권으로 이어집니다.",
    useNote: "소사는 단독·다세대 주택이 많아 정확한 도로명 주소와 공동현관 확인이 필요한 생활권입니다.",
    links: [{ title: "부천·연결 생활권", items: [
      { label: "역곡·소사 연결 생활권 보기", url: "/corridor/yeokgok-sosa/" },
      { label: "범박·옥길 생활권 안내", url: "/bucheon/life/beombak-okgil/" },
      { label: "소사역 주변 확인", url: "/station/sosa-station/" }
    ]}]
  },
  {
    slug: "wonjong-gogang", region: "bucheon", regionLabel: "부천",
    title: "원종·고강 생활권 안내｜오정구 방문 전 확인 · 간다GO",
    description: "원종·고강 주거지와 서울 강서·인천 계양 인접권 확인을 안내합니다.",
    h1: "원종·고강 생활권 안내",
    keywords: ["원종 출장마사지", "고강동 홈타이", "부천 오정구 생활권"],
    overview: "원종과 고강은 부천 오정구의 주거 중심 생활권으로, 서울 강서구·인천 계양구와 맞닿은 경계 지역입니다. 대장신도시 조성과 함께 변화가 이어지는 지역이라, 최신 도로명 주소와 단지명을 확인하는 것이 좋습니다.",
    parentNote: "행정구역상 오정구에 속하며, 원종역·까치울역 등과 함께 확인하기 좋습니다.",
    lifeNote: "원종·고강은 서울 강서와 인천 계양 사이의 인접 이동권에 있어, 방문 위치가 어느 도시 경계에 가까운지 확인이 필요합니다.",
    nearbyNote: "가까운 역은 원종역이며, 인접 이동권으로는 원종·고강 연결 생활권으로 이어집니다.",
    useNote: "원종·고강은 다세대·단독 주택과 신축 단지가 섞여 있어, 공동현관과 정확한 주소 확인이 중요한 생활권입니다.",
    links: [{ title: "부천·연결 생활권", items: [
      { label: "원종·고강 연결 생활권 보기", url: "/corridor/wonjong-gogang/" },
      { label: "원종역 주변 확인", url: "/station/wonjong-station/" },
      { label: "외곽 지역 이용 전 확인", url: "/use/outer-area/" }
    ]}]
  },

  // ---------------- 시흥 ----------------
  {
    slug: "baegot-jeongwang", region: "siheung", regionLabel: "시흥",
    title: "배곧·정왕 생활권 안내｜시흥 방문 전 확인 · 간다GO",
    description: "배곧신도시·정왕 산업권 방문 전 주소·이동·출입 기준을 안내합니다.",
    h1: "배곧·정왕 생활권 안내",
    keywords: ["배곧 출장마사지", "정왕 홈타이", "시흥 배곧신도시 생활권"],
    overview: "배곧신도시와 정왕 일대는 시흥 서부 해안권에 위치한 대표 생활권으로, 신축 아파트·오피스텔이 밀집한 배곧과 시화산업단지·역세권이 있는 정왕이 이어져 있습니다. 신도시와 산업지구가 함께 있어 방문 위치의 성격을 먼저 확인하는 것이 중요합니다.",
    parentNote: "행정구역상 배곧동·정왕동 일대에 속하며, 정왕역·오이도역과 함께 확인하기 좋습니다.",
    lifeNote: "배곧은 인천 송도와 해안을 사이에 두고 가까워 송도·배곧 연결 생활권으로 이어지고, 정왕은 시화산단·오이도 해안권과 연결됩니다.",
    nearbyNote: "가까운 역은 정왕역·오이도역이며, 송도 방향으로는 송도·배곧, 정왕 방향으로는 정왕·배곧 연결 생활권으로 이어집니다.",
    useNote: "배곧은 신축 오피스텔·아파트가 많아 공동현관 등록 절차를, 정왕은 산업단지 인접 특성상 이동 시간과 주차를 확인해야 하는 생활권입니다.",
    areaTypeNote: "정왕 시화산단 인접 구역은 야간 이동 시간이 길어질 수 있어, 예약 가능 시간과 추가 이동비를 함께 확인하세요.",
    links: [{ title: "시흥·연결 생활권", items: [
      { label: "송도·배곧 연결 생활권 보기", url: "/corridor/songdo-baegot/" },
      { label: "정왕·배곧 연결 생활권 보기", url: "/corridor/jeongwang-baegot/" },
      { label: "정왕역 주변 확인", url: "/station/jeongwang-station/" },
      { label: "산업지구 이용 전 확인", url: "/use/industrial-area/" }
    ]}]
  },
  {
    slug: "eungye-janghyeon", region: "siheung", regionLabel: "시흥",
    title: "은계·장현 생활권 안내｜시흥 신도시 방문 전 확인 · 간다GO",
    description: "은계·장현 신도시와 시흥시청 인접 생활권 방문 전 확인을 안내합니다.",
    h1: "은계·장현 생활권 안내",
    keywords: ["은계 출장마사지", "장현 홈타이", "시흥 신도시 생활권"],
    overview: "은계와 장현은 시흥 내륙에 조성된 신도시 생활권으로, 신축 아파트 단지와 상업시설, 시흥시청 일대가 이어져 있습니다. 단지가 새로 조성된 지역이라 도로명 주소와 단지명이 최신인지 확인하는 것이 좋습니다.",
    parentNote: "행정구역상 은행동·장현동 일대에 속하며, 시흥시청역과 함께 확인하기 좋습니다.",
    lifeNote: "은계·장현은 부천·광명·안산 인접권과 이어지며, 신도시 특성상 단지 간 이동 거리가 있어 위치 확인이 중요합니다.",
    nearbyNote: "가까운 역은 시흥시청역이며, 인접 이동권으로는 은계·장현 연결 생활권으로 이어집니다.",
    useNote: "은계·장현은 신축 아파트가 많아 공동현관 비밀번호와 방문객 등록 절차 확인이 필요한 생활권입니다.",
    links: [{ title: "시흥·연결 생활권", items: [
      { label: "은계·장현 연결 생활권 보기", url: "/corridor/eungye-janghyeon/" },
      { label: "배곧·정왕 생활권 안내", url: "/siheung/life/baegot-jeongwang/" },
      { label: "신도시 생활권 이용 전 확인", url: "/use/newtown/" }
    ]}]
  },
  {
    slug: "wolgot-oido", region: "siheung", regionLabel: "시흥",
    title: "월곶·오이도 생활권 안내｜시흥 해안권 방문 전 확인 · 간다GO",
    description: "월곶·오이도 해안권 숙소·관광지 방문 전 이동·출입 확인을 안내합니다.",
    h1: "월곶·오이도 해안권 생활권 안내",
    keywords: ["월곶 출장마사지", "오이도 홈타이", "시흥 해안권 생활권"],
    overview: "월곶과 오이도는 시흥 서해안에 위치한 해안권 생활권으로, 포구·관광지와 숙소, 신도시가 함께 있는 지역입니다. 관광지 인접 특성상 숙소 이용 비중이 높아, 숙소 정책과 객실 방문 규정을 미리 확인해야 합니다.",
    parentNote: "행정구역상 월곶동·정왕동 오이도 일대에 속하며, 월곶역·오이도역과 함께 확인하기 좋습니다.",
    lifeNote: "월곶·오이도는 인천 송도·남동권과 해안을 사이에 두고 가까워, 구월·월곶 및 송도·배곧 연결 생활권과 함께 볼 수 있습니다.",
    nearbyNote: "가까운 역은 월곶역·오이도역이며, 인천 방향으로는 구월·월곶 연결 생활권으로 이어집니다.",
    useNote: "월곶·오이도는 해안권 숙소와 펜션 이용이 많아, 숙소 방문객 정책과 차량 이동 시간 확인이 핵심인 생활권입니다.",
    areaTypeNote: "해안권은 도심과 떨어져 이동 시간이 길 수 있어, 예약 가능 시간과 추가 이동비를 사전에 확인하세요.",
    links: [{ title: "시흥·해안권", items: [
      { label: "해안권 이용 전 확인", url: "/use/coastal-area/" },
      { label: "구월·월곶 연결 생활권 보기", url: "/corridor/guwol-wolgot/" },
      { label: "오이도역 주변 확인", url: "/station/oido-station/" }
    ]}]
  },
  {
    slug: "daeya-sincheon", region: "siheung", regionLabel: "시흥",
    title: "대야·신천 생활권 안내｜시흥 방문 전 확인 · 간다GO",
    description: "대야·신천 주거지와 부천·광명 인접 이동권 방문 전 확인을 안내합니다.",
    h1: "대야·신천 생활권 안내",
    keywords: ["대야 출장마사지", "신천동 홈타이", "시흥 대야 생활권"],
    overview: "대야와 신천은 시흥 동북부의 주거 중심 생활권으로, 부천·광명·서울 서남권과 가까운 경계 지역입니다. 서해선 시흥대야역을 낀 역세권으로, 주거단지와 상가가 함께 있어 방문 위치 확인이 필요합니다.",
    parentNote: "행정구역상 대야동·신천동 일대에 속하며, 시흥대야역·신천역과 함께 확인하기 좋습니다.",
    lifeNote: "대야·신천은 부천 소사·광명 인접 이동권으로 이어져, 도시 경계를 넘는 위치 확인이 중요합니다.",
    nearbyNote: "가까운 역은 시흥대야역·신천역이며, 부천 방향으로는 부천·시흥 인접권으로 이어집니다.",
    useNote: "대야·신천은 아파트와 다세대 주택이 섞여 있어, 공동현관과 정확한 주소 확인이 필요한 생활권입니다.",
    links: [{ title: "시흥·연결 생활권", items: [
      { label: "부천·시흥 인접권 보기", url: "/corridor/bucheon-siheung-adjacent/" },
      { label: "시흥대야역 주변 확인", url: "/station/siheung-daeya-station/" },
      { label: "은계·장현 생활권 안내", url: "/siheung/life/eungye-janghyeon/" }
    ]}]
  },
  {
    slug: "mokgam-neunggok", region: "siheung", regionLabel: "시흥",
    title: "목감·능곡 생활권 안내｜시흥 방문 전 확인 · 간다GO",
    description: "목감·능곡 주거지와 광명·안산 인접 이동권 방문 전 확인을 안내합니다.",
    h1: "목감·능곡 생활권 안내",
    keywords: ["목감 출장마사지", "능곡동 홈타이", "시흥 목감 생활권"],
    overview: "목감과 능곡은 시흥 동부의 주거 생활권으로, 광명·안산과 가까운 인접 이동권에 위치합니다. 목감지구·능곡지구 신축 단지가 자리해, 최신 단지명과 도로명 주소 확인이 좋습니다.",
    parentNote: "행정구역상 목감동·능곡동 일대에 속하며, 시흥능곡역과 함께 확인하기 좋습니다.",
    lifeNote: "목감·능곡은 광명·안산 인접 이동권으로 이어져, 방문 위치가 어느 도시 경계에 가까운지 확인이 필요합니다.",
    nearbyNote: "가까운 역은 시흥능곡역이며, 인접 이동권으로는 은계·장현 연결 생활권과 이어집니다.",
    useNote: "목감·능곡은 신축 아파트가 많아 공동현관 등록 절차와 주차 확인이 필요한 생활권입니다.",
    links: [{ title: "시흥·연결 생활권", items: [
      { label: "은계·장현 생활권 안내", url: "/siheung/life/eungye-janghyeon/" },
      { label: "시흥능곡역 주변 확인", url: "/station/siheung-neunggok-station/" },
      { label: "외곽 지역 이용 전 확인", url: "/use/outer-area/" }
    ]}]
  }
];

export const lifeareas = raw.map((r) => ({
  ...r,
  url: `/${r.region}/life/${r.slug}/`,
  breadcrumb: [crumb.home, crumb[r.region], { label: r.h1.replace(" 안내", ""), url: `/${r.region}/life/${r.slug}/` }],
  faq: baseFaq,
  ...whw(`${r.regionLabel} ${r.h1.replace(" 생활권 안내", "").replace(" 안내", "")}`),
  lastUpdated: LAST_UPDATED,
  ogImage: OG,
  imageAlt: `${r.h1} 방문형 관리 안내 이미지`,
  indexPriority: 1,
  contentStatus: "ready"
}));
