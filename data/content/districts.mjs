import { crumb, whw, baseFaq, LAST_UPDATED, OG } from "./_helpers.mjs";

// 구군 허브 = 집계·내비게이션 페이지 (도어웨이 아님).
// 하위 생활권/역세권을 조직화하고, 번호동은 개별 페이지 없이 대표동으로 묶어 나열.
// 하위 생활권 데이터가 실제로 존재하는 구만 index (얇은 페이지 방지).
const raw = [
  // ---- 인천 ----
  {
    region: "incheon", slug: "yeonsu-gu", name: "연수구",
    intro: "인천 연수구는 송도국제도시와 연수 원도심이 함께 있는 구입니다. 송도는 고층 오피스텔·업무지구 중심의 계획 신도시이고, 연수·옥련·청학 일대는 오래된 주거 생활권입니다. 방문 위치가 송도 신도시인지 연수 원도심인지에 따라 건물 출입 방식과 이동 기준이 다르므로 함께 확인하는 것이 좋습니다.",
    lifeSlugs: ["songdo-international-city"],
    stationSlugs: ["incheon-univ-station", "central-park-station", "woninjae-station"],
    dongs: ["송도동", "연수동", "옥련동", "청학동", "동춘동"]
  },
  {
    region: "incheon", slug: "namdong-gu", name: "남동구",
    intro: "인천 남동구는 인천시청과 구월 상권을 중심으로 한 행정·상업 구입니다. 구월·간석은 상권과 관공서, 논현·만수는 주거 생활권으로 성격이 다릅니다. 남동공단 방향 산업권과 시흥 월곶 해안권 인접 이동권도 함께 확인할 수 있습니다.",
    lifeSlugs: ["guwol-incheon-cityhall"],
    stationSlugs: ["guwol-station", "incheon-cityhall-station"],
    dongs: ["구월동", "논현동", "만수동", "간석동", "서창동"]
  },
  {
    region: "incheon", slug: "bupyeong-gu", name: "부평구",
    intro: "인천 부평구는 부평역 상권과 삼산·산곡 주거지가 함께 있는 구로, 부천 상동·중동과 생활권이 강하게 이어지는 지역입니다. 1호선·7호선·인천1호선이 지나 환승 거점이 많아, 방문 위치와 가까운 역을 함께 확인하는 것이 좋습니다.",
    lifeSlugs: ["bupyeong-station-market"],
    stationSlugs: ["bupyeong-station", "bupyeong-gu-office-station"],
    dongs: ["부평동", "삼산동", "산곡동", "부개동", "십정동"]
  },
  {
    region: "incheon", slug: "michuhol-gu", name: "미추홀구",
    intro: "인천 미추홀구는 주안·도화·용현·학익을 중심으로 한 원도심 구입니다. 오래된 상권과 다세대 주거지, 대학가가 함께 있어 골목·다세대 주소 확인이 특히 중요합니다.",
    lifeSlugs: ["juan-dohwa"],
    stationSlugs: ["juan-station"],
    dongs: ["주안동", "도화동", "용현동", "학익동", "숭의동"]
  },
  {
    region: "incheon", slug: "seohae-gu", name: "서해권(서구)",
    intro: "인천 서해권은 청라국제도시와 서구 일대를 아우르는 신도시·주거 구입니다. 청라는 대규모 아파트·상업지구가 있는 신도시로 단지 간 이동 거리가 있어 위치 확인이 중요합니다. 인천 행정체제 개편에 따라 관할 구역 명칭이 변동될 수 있어 최신 기준으로 확인합니다.",
    lifeSlugs: ["cheongna-seohae"],
    stationSlugs: [],
    dongs: ["청라동", "가정동", "석남동", "신현동", "가좌동"]
  },
  {
    region: "incheon", slug: "geomdan-gu", name: "검단권",
    intro: "인천 검단권은 검단신도시를 중심으로 빠르게 조성 중인 신도시 지역입니다. 신축 아파트와 상업시설이 들어서는 지역이라 도로명 주소·단지명이 최신인지 확인이 중요합니다. 김포 인접권과도 이어집니다.",
    lifeSlugs: ["geomdan-newtown"],
    stationSlugs: [],
    dongs: ["검단동", "원당동", "당하동", "마전동", "불로동"]
  },
  {
    region: "incheon", slug: "gyeyang-gu", name: "계양구",
    intro: "인천 계양구는 계산·작전 주거·상권을 중심으로 한 구로, 인천1호선이 지나고 서울 강서·부천 오정과 맞닿은 경계 지역입니다. 계양구청·계양산 일대의 생활 인프라가 밀집해 있으며, 계양신도시(3기 신도시) 조성으로 신축 단지가 순차적으로 들어서고 있어 최신 주소·단지명 확인이 중요합니다.",
    lifeSlugs: ["gyesan-jakjeon"],
    stationSlugs: ["gyesan-station", "jakjeon-station"],
    dongs: ["계산동", "작전동", "효성동", "서운동", "병방동", "임학동"]
  },
  {
    region: "incheon", slug: "jemulpo-gu", name: "제물포권",
    intro: "인천 제물포권은 제물포·동인천을 중심으로 한 인천의 대표 원도심 지역입니다. 1호선 제물포역·동인천역을 축으로 오래된 상권과 주택가, 개항장 근대 거리가 함께 있어 골목·다세대 주소 확인이 특히 중요합니다. 인천 행정체제 개편에 따라 제물포구의 명칭과 관할 구역이 조정될 수 있어 확정 고시된 최신 기준으로 확인합니다.",
    lifeSlugs: ["jemulpo-dongincheon"],
    stationSlugs: ["jemulpo-station", "dongincheon-station"],
    dongs: ["도원동", "숭의동", "용현동", "신흥동", "송현동"]
  },
  {
    region: "incheon", slug: "yeongjong-gu", name: "영종권",
    intro: "인천 영종권은 인천공항과 영종·운서 하늘도시를 아우르는 공항 배후 구입니다. 공항 종사자 주거지, 하늘도시 신축 단지, 공항권 숙소가 함께 있으며 도심과 다리로 연결되어 이동 시간이 길 수 있습니다.",
    lifeSlugs: ["incheon-airport", "yeongjong-unseo"],
    stationSlugs: ["unseo-station", "incheon-airport-terminal-1-station"],
    dongs: ["운서동", "중산동", "운남동", "영종동"]
  },
  // ---- 부천 ----
  {
    region: "bucheon", slug: "wonmi-gu", name: "원미구",
    intro: "부천 원미구는 중동·신중동·상동 상권과 부천역·심곡 원도심, 춘의·부천종합운동장 생활권을 아우르는 구입니다. 7호선·1호선·서해선이 지나 상업·주거·교통이 밀집해 있어, 방문 위치가 상가인지 주거단지인지 확인이 필요합니다.",
    lifeSlugs: ["jungdong-sinjungdong", "sangdong-bucheon-cityhall", "bucheon-station-simgok", "chunui-bucheon-stadium"],
    stationSlugs: ["sinjungdong-station", "sangdong-station", "bucheon-station", "jungdong-station", "bucheon-cityhall-station", "chunui-station", "bucheon-stadium-station"],
    dongs: ["중동", "상동", "심곡동", "춘의동", "약대동", "도당동"]
  },
  {
    region: "bucheon", slug: "sosa-gu", name: "소사구",
    intro: "부천 소사구는 부천역·송내·역곡 상권과 소사·범박·옥길 주거 생활권을 아우르는 구입니다. 1호선·서해선이 지나고 서울 구로·인천 부평과 맞닿아 경계 이동권이 많습니다. 단독·다세대와 신축 단지가 섞여 있어 주소 확인이 중요합니다.",
    lifeSlugs: ["songnae", "yeokgok", "sosa-sosabon", "beombak-okgil"],
    stationSlugs: ["sosa-station", "yeokgok-station", "songnae-station"],
    dongs: ["소사본동", "송내동", "역곡동", "범박동", "옥길동", "괴안동"]
  },
  {
    region: "bucheon", slug: "ojeong-gu", name: "오정구",
    intro: "부천 오정구는 원종·고강 주거 생활권과 오정·신흥 주거·산업 혼재권을 아우르는 구로, 서울 강서·인천 계양과 맞닿은 경계 지역입니다. 대장신도시 조성으로 변화가 이어져 최신 주소·단지명 확인이 중요합니다.",
    lifeSlugs: ["wonjong-gogang", "ojeong-sinheung"],
    stationSlugs: ["wonjong-station", "kkachiwool-station"],
    dongs: ["원종동", "고강동", "오정동", "신흥동", "성곡동", "대장동"]
  }
];

export const districts = raw.map((r) => {
  const regionLabel = r.region === "incheon" ? "인천" : r.region === "bucheon" ? "부천" : "시흥";
  return {
    ...r,
    regionLabel,
    url: `/${r.region}/${r.slug}/`,
    title: `${regionLabel} ${r.name} 생활권 안내｜방문 전 확인 · 간다GO`,
    description: `${regionLabel} ${r.name} 주요 생활권·역세권·예약 전 확인을 안내합니다.`.slice(0, 80),
    h1: `${regionLabel} ${r.name} 생활권 안내`,
    keywords: [`${regionLabel} ${r.name} 출장마사지`, `${r.name} 홈타이`, `${regionLabel} ${r.name} 생활권`],
    breadcrumb: [crumb.home, crumb[r.region], { label: r.name, url: `/${r.region}/${r.slug}/` }],
    faq: baseFaq,
    ...whw(`${regionLabel} ${r.name}`),
    lastUpdated: LAST_UPDATED,
    ogImage: OG,
    imageAlt: `${regionLabel} ${r.name} 생활권 안내 이미지`,
    indexPriority: 1,
    contentStatus: "ready"
  };
});
