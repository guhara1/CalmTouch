import { crumb, whw, baseFaq, LAST_UPDATED, OG } from "./_helpers.mjs";
import { lifeareas } from "./lifeareas.mjs";
import { stations } from "./stations.mjs";

// 상위 생활권/역 이름 조회 (동 페이지 본문을 고유하게 만들기 위해)
const lifeName = (slug) => {
  const l = lifeareas.find((a) => a.slug === slug);
  return l ? l.h1.replace(/\s*생활권\s*안내$/, "").replace(/\s*안내$/, "").trim() : "";
};
const stationName = (slug) => {
  const s = stations.find((a) => a.slug === slug);
  return s ? s.h1.replace(/\s*역세권\s*안내$/, "").replace(/\s*안내$/, "").trim() : "";
};

// 행정동 데이터.
//  - life: 이미 존재하는 생활권 페이지가 그 동을 대표 → 버튼은 그 생활권으로 연결(중복 페이지 미생성)
//  - slug: 생활권이 없는 동 → 고유 내용의 개별 동 페이지 생성(noindex, 도어웨이 방지)
//  - collapse: 번호동을 대표동 1개로 묶었다는 안내 문구
// 구(區)가 있는 인천·부천만 해당. 시흥은 구가 없어 생활권 단위로 이미 묶음(번호동 병합).
const districtDongs = {
  // ---------------- 인천 ----------------
  "yeonsu-gu": { region: "incheon", regionLabel: "인천", name: "연수구", dongs: [
    { name: "송도동", life: "songdo-international-city", collapse: "송도1~5동" },
    { name: "연수동", slug: "yeonsu-dong", station: "woninjae-station", area: "songdo-international-city", collapse: "연수1~3동", focus: "연수동은 인천 연수구의 원도심 주거 중심으로, 원인재역과 연수 대단지 아파트, 오래된 상권이 함께 있는 지역입니다." },
    { name: "옥련동", slug: "okryeon-dong", area: "songdo-international-city", focus: "옥련동은 청량산과 인천상륙작전기념관 인근의 주거 지역으로, 단독·다세대 주택과 아파트가 섞여 있습니다." },
    { name: "청학동", slug: "cheonghak-dong", area: "songdo-international-city", focus: "청학동은 문학산 자락의 주거 지역으로, 문학경기장과 가까운 조용한 주택가입니다." },
    { name: "동춘동", slug: "dongchun-dong", station: "woninjae-station", area: "songdo-international-city", focus: "동춘동은 연수 남부의 아파트 주거 지역으로, 동춘역·연수 생활권과 이어집니다." }
  ]},
  "namdong-gu": { region: "incheon", regionLabel: "인천", name: "남동구", dongs: [
    { name: "구월동", life: "guwol-incheon-cityhall", collapse: "구월1~4동" },
    { name: "논현동", slug: "nonhyeon-dong", area: "guwol-incheon-cityhall", collapse: "논현1·2동", focus: "논현동은 논현지구 신도시 아파트와 소래포구 인근 상권이 함께 있는 남동구 남부의 주거 지역입니다." },
    { name: "만수동", slug: "mansu-dong", area: "guwol-incheon-cityhall", collapse: "만수1~6동", focus: "만수동은 대단지 아파트가 밀집한 남동구의 대표 주거 지역으로, 만수주공 일대가 중심입니다." },
    { name: "간석동", slug: "ganseok-dong", area: "guwol-incheon-cityhall", collapse: "간석1~4동", focus: "간석동은 간석오거리를 중심으로 한 상권·주거 혼재 지역으로, 유동 인구가 많습니다." },
    { name: "서창동", slug: "seochang-dong", area: "guwol-incheon-cityhall", focus: "서창동은 서창2지구 신도시 아파트가 자리한 남동구 동부의 주거 지역입니다." }
  ]},
  "bupyeong-gu": { region: "incheon", regionLabel: "인천", name: "부평구", dongs: [
    { name: "부평동", life: "bupyeong-station-market", collapse: "부평1~6동" },
    { name: "삼산동", slug: "samsan-dong", area: "bupyeong-station-market", focus: "삼산동은 삼산체육관과 부천 상동에 인접한 신시가지로, 부천 생활권과 강하게 이어지는 아파트 주거 지역입니다." },
    { name: "산곡동", slug: "sangok-dong", area: "bupyeong-station-market", focus: "산곡동은 재개발이 이어지는 부평구의 주거 지역으로, 신축 단지와 노후 주택이 섞여 있습니다." },
    { name: "부개동", slug: "bugae-dong", area: "bupyeong-station-market", focus: "부개동은 부개역 인근의 주거 지역으로, 1호선 역세권과 아파트 단지가 함께 있습니다." },
    { name: "십정동", slug: "sipjeong-dong", area: "bupyeong-station-market", focus: "십정동은 백운역 인근의 주거 지역으로, 재개발과 노후 주택이 혼재합니다." }
  ]},
  "michuhol-gu": { region: "incheon", regionLabel: "인천", name: "미추홀구", dongs: [
    { name: "주안동", life: "juan-dohwa", collapse: "주안1~8동" },
    { name: "도화동", life: "juan-dohwa" },
    { name: "용현동", slug: "yonghyeon-dong", area: "juan-dohwa", collapse: "용현1~5동", focus: "용현동은 인하대학교 인근의 주거·상권 지역으로, 대학가와 아파트가 함께 있습니다." },
    { name: "학익동", slug: "hakik-dong", area: "juan-dohwa", collapse: "학익1·2동", focus: "학익동은 법조단지와 아파트 단지가 자리한 미추홀구 남부의 주거 지역입니다." },
    { name: "숭의동", slug: "sungui-dong", area: "juan-dohwa", collapse: "숭의1~4동", focus: "숭의동은 미추홀구의 원도심 주거 지역으로, 오래된 주택가와 상권이 이어집니다." }
  ]},
  "seohae-gu": { region: "incheon", regionLabel: "인천", name: "서해권(서구)", dongs: [
    { name: "청라동", life: "cheongna-seohae", collapse: "청라1~3동" },
    { name: "가정동", slug: "gajeong-dong", area: "cheongna-seohae", focus: "가정동은 루원시티 도시개발이 진행되는 서구의 신주거 지역으로, 신축 단지가 순차적으로 들어섭니다." },
    { name: "석남동", slug: "seongnam-dong", area: "cheongna-seohae", focus: "석남동은 주거와 공단이 인접한 서구의 지역으로, 7호선 연장 역세권과 가깝습니다." },
    { name: "신현동", slug: "sinhyeon-dong", area: "cheongna-seohae", focus: "신현동은 신현·원창 일대의 주거 지역으로, 청라·가정 생활권과 이어집니다." },
    { name: "가좌동", slug: "gajwa-dong", area: "cheongna-seohae", focus: "가좌동은 공단과 인접한 서구의 주거 지역으로, 주택가와 산업 시설이 섞여 있습니다." }
  ]},
  "geomdan-gu": { region: "incheon", regionLabel: "인천", name: "검단권", dongs: [
    { name: "검단동", life: "geomdan-newtown" },
    { name: "원당동", slug: "wondang-dong", area: "geomdan-newtown", focus: "원당동은 검단신도시 원당지구의 신축 아파트가 밀집한 지역으로, 도로명·단지명이 최신인지 확인이 중요합니다." },
    { name: "당하동", slug: "dangha-dong", area: "geomdan-newtown", focus: "당하동은 검단신도시 당하지구의 신축 주거 지역으로, 상업시설이 함께 조성 중입니다." },
    { name: "마전동", slug: "majeon-dong", area: "geomdan-newtown", focus: "마전동은 검단권의 주거 지역으로, 신축 단지와 기존 주택이 섞여 있습니다." },
    { name: "불로동", slug: "bullo-dong", area: "geomdan-newtown", focus: "불로동은 김포와 인접한 검단권 외곽 주거 지역으로, 이동 시간이 길 수 있어 사전 확인이 필요합니다." }
  ]},
  "yeongjong-gu": { region: "incheon", regionLabel: "인천", name: "영종권", dongs: [
    { name: "운서동", life: "yeongjong-unseo" },
    { name: "중산동", slug: "jungsan-dong", area: "yeongjong-unseo", focus: "중산동은 영종 하늘도시의 신축 아파트가 밀집한 지역으로, 단지 규모가 커 정확한 동·호수 확인이 중요합니다." },
    { name: "운남동", slug: "unnam-dong", area: "yeongjong-unseo", focus: "운남동은 영종 구도심의 주거 지역으로, 오래된 주택가와 상권이 이어집니다." },
    { name: "영종동", slug: "yeongjong-dong", area: "incheon-airport", focus: "영종동은 영종 행정 중심 지역으로, 공항 배후 주거와 생활 인프라가 자리합니다." }
  ]},
  "gyeyang-gu": { region: "incheon", regionLabel: "인천", name: "계양구", dongs: [
    { name: "계산동", slug: "gyesan-dong", station: "gyesan-station", area: "gyesan-jakjeon", collapse: "계산1~4동", focus: "계산동은 계양구청과 계산 상권이 자리한 계양구의 중심 지역으로, 인천1호선 계산역 역세권입니다." },
    { name: "작전동", slug: "jakjeon-dong", station: "jakjeon-station", area: "gyesan-jakjeon", collapse: "작전1·2동", focus: "작전동은 주거와 상권이 밀집한 계양구의 지역으로, 작전역 역세권과 아파트 단지가 함께 있습니다." },
    { name: "효성동", slug: "hyoseong-dong", area: "gyesan-jakjeon", collapse: "효성1·2동", focus: "효성동은 계양구 서부의 주거 지역으로, 부천 오정·서울 강서 방향 이동권과 가깝습니다." },
    { name: "서운동", slug: "seoun-dong", area: "gyesan-jakjeon", focus: "서운동은 서운산업단지와 인접한 계양구의 지역으로, 산업 시설과 주거가 섞여 있습니다." },
    { name: "병방동", slug: "byeongbang-dong", area: "gyesan-jakjeon", focus: "병방동은 계양산 자락의 주거 지역으로, 아파트 단지와 조용한 주택가가 이어집니다." },
    { name: "임학동", slug: "imhak-dong", area: "gyesan-jakjeon", focus: "임학동은 인천1호선 임학역 인근의 주거 지역으로, 계산 생활권과 이어집니다." }
  ]},
  "jemulpo-gu": { region: "incheon", regionLabel: "인천", name: "제물포권", dongs: [
    { name: "도원동", slug: "dowon-dong", area: "jemulpo-dongincheon", focus: "도원동은 1호선 도원역 인근의 원도심 주거 지역으로, 개항장·동인천 생활권과 가깝습니다." },
    { name: "송현동", slug: "songhyeon-dong", area: "jemulpo-dongincheon", focus: "송현동은 수도국산 자락의 원도심 지역으로, 오래된 주택가와 전통시장이 이어집니다." },
    { name: "화수동", slug: "hwasu-dong", area: "jemulpo-dongincheon", focus: "화수동은 부두와 인접한 원도심 주거 지역으로, 골목이 촘촘해 정확한 주소 확인이 중요합니다." },
    { name: "만석동", slug: "manseok-dong", area: "jemulpo-dongincheon", focus: "만석동은 부두·공단과 인접한 원도심 지역으로, 산업 시설과 노후 주거가 섞여 있습니다." },
    { name: "창영동", slug: "changyeong-dong", area: "jemulpo-dongincheon", focus: "창영동은 배다리 헌책방거리와 근대역사거리가 있는 원도심 지역으로, 좁은 골목이 많습니다." }
  ]},
  // ---------------- 부천 ----------------
  "wonmi-gu": { region: "bucheon", regionLabel: "부천", name: "원미구", dongs: [
    { name: "중동", life: "jungdong-sinjungdong", collapse: "중1~4동" },
    { name: "상동", life: "sangdong-bucheon-cityhall", collapse: "상1~3동" },
    { name: "심곡동", life: "bucheon-station-simgok", collapse: "심곡1~3동" },
    { name: "춘의동", life: "chunui-bucheon-stadium" },
    { name: "약대동", slug: "yakdae-dong", area: "jungdong-sinjungdong", focus: "약대동은 부천대학교 인근의 주거 지역으로, 중동 생활권과 이어지는 아파트·주택가입니다." },
    { name: "도당동", slug: "dodang-dong", area: "chunui-bucheon-stadium", focus: "도당동은 주거와 소규모 산업이 혼재한 원미구 북부의 지역으로, 춘의 생활권과 가깝습니다." }
  ]},
  "sosa-gu": { region: "bucheon", regionLabel: "부천", name: "소사구", dongs: [
    { name: "소사본동", life: "sosa-sosabon" },
    { name: "송내동", life: "songnae", collapse: "송내1·2동" },
    { name: "역곡동", life: "yeokgok" },
    { name: "범박동", life: "beombak-okgil" },
    { name: "옥길동", life: "beombak-okgil" },
    { name: "괴안동", slug: "goean-dong", area: "yeokgok", focus: "괴안동은 역곡 남부의 주거 지역으로, 다세대·단독 주택이 밀집해 정확한 주소 확인이 중요합니다." }
  ]},
  "ojeong-gu": { region: "bucheon", regionLabel: "부천", name: "오정구", dongs: [
    { name: "원종동", life: "wonjong-gogang", collapse: "원종1·2동" },
    { name: "고강동", life: "wonjong-gogang", collapse: "고강본동·고강1동" },
    { name: "오정동", life: "ojeong-sinheung" },
    { name: "신흥동", life: "ojeong-sinheung" },
    { name: "성곡동", slug: "seonggok-dong", area: "ojeong-sinheung", focus: "성곡동은 소규모 산업 시설과 주거가 인접한 오정구의 지역으로, 오정 생활권과 이어집니다." },
    { name: "대장동", slug: "daejang-dong", area: "wonjong-gogang", focus: "대장동은 부천 대장신도시(3기 신도시) 예정지로, 조성이 진행되는 지역이라 최신 주소·단지명 확인이 필요합니다." }
  ]}
};

// 상위 생활권 slug → URL/label 매핑용(생활권은 /{region}/life/{slug}/)
const lifeUrl = (region, slug) => `/${region}/life/${slug}/`;

// 구군 허브에서 쓸 동 버튼 목록
export function dongButtons(districtSlug) {
  const d = districtDongs[districtSlug];
  if (!d) return [];
  return d.dongs.map((x) =>
    x.life
      ? { label: x.name, url: lifeUrl(d.region, x.life), kind: "life" }
      : { label: x.name, url: `/${d.region}/${districtSlug}/${x.slug}/`, kind: "dong" }
  );
}

// 개별 동 페이지(생활권 없는 동만 · noindex)
export const dongPages = [];
for (const [districtSlug, d] of Object.entries(districtDongs)) {
  for (const x of d.dongs) {
    if (x.life) continue; // 생활권 페이지로 대체 → 새 페이지 미생성
    const url = `/${d.region}/${districtSlug}/${x.slug}/`;
    const pLife = lifeName(x.area); // 상위 생활권명
    const sName = x.station ? stationName(x.station) : ""; // 가까운 역명
    dongPages.push({
      slug: x.slug,
      region: d.region,
      districtSlug,
      url,
      title: `${x.name} 출장마사지 · ${d.regionLabel} ${d.name} 안내｜간다GO`,
      description: `${x.name} 방문 전 주소·건물 출입·${pLife || d.name} 인접권 확인 안내.`.slice(0, 80),
      h1: `${x.name} 안내`,
      keywords: [`${x.name} 출장마사지`, `${x.name} 홈타이`, `${d.regionLabel} ${d.name}`],
      breadcrumb: [crumb.home, crumb[d.region], { label: d.name, url: `/${d.region}/${districtSlug}/` }, { label: x.name, url }],
      overview: `${x.focus} 방문 위치가 아파트 단지인지 상가·주택가인지에 따라 확인할 내용이 달라, 정확한 도로명 주소와 건물 유형을 먼저 확인하는 것이 좋습니다.`,
      parentNote: `행정구역상 ${d.regionLabel} ${d.name}에 속합니다.${x.collapse ? ` ${x.collapse}은 대표동 ${x.name}으로 묶어 안내합니다.` : ""}`,
      lifeNote: pLife
        ? `${x.name}은 ${pLife} 생활권에 속하는 지역으로, 개별 동 위치와 함께 넓은 ${pLife} 생활권 안내를 확인하면 방문 위치를 더 정확히 파악할 수 있습니다.`
        : `${x.name}은 ${d.name}의 주요 행정동으로, 인접 생활권 안내와 함께 확인하면 위치를 더 정확히 파악할 수 있습니다.`,
      nearbyNote: sName
        ? `${x.name}에서 가장 가까운 역은 ${sName}입니다. 역세권 안내에서 인접 지역과 이동 기준, 환승 정보를 함께 확인할 수 있습니다.`
        : `${x.name}과 가까운 생활권·지하철역은 ${pLife || d.name} 안내에서 확인할 수 있으며, 인접 도시 이동권도 함께 살펴보는 것이 좋습니다.`,
      useNote: `${x.name}에서 방문형 서비스를 이용할 때는 정확한 도로명 주소와 동·호수, 공동현관 출입 방식(오피스텔·아파트 관리 규정 포함)을 먼저 확인하는 것이 좋습니다. ${d.name}은 상가·주거·신축 단지가 섞여 있어 방문 위치의 건물 유형 확인이 특히 중요합니다.`,
      links: [{ title: "상위 생활권·역세권", items: [
        { label: `${pLife || d.name} 생활권 안내`, url: lifeUrl(d.region, x.area) },
        { label: `${d.regionLabel} ${d.name} 안내`, url: `/${d.region}/${districtSlug}/` },
        ...(x.station ? [{ label: `${sName} 주변 확인`, url: `/station/${x.station}/` }] : [])
      ]}],
      faq: baseFaq,
      ...whw(`${d.regionLabel} ${d.name} ${x.name}`),
      lastUpdated: LAST_UPDATED,
      ogImage: OG,
      imageAlt: `${d.regionLabel} ${d.name} ${x.name} 방문형 관리 안내 이미지`,
      indexPriority: 2,
      contentStatus: "ready"
    });
  }
}

// ---------------- 시흥 (구 없음 → 행정동이 시(市) 바로 아래) ----------------
// life: 생활권 페이지로 연결(중복 미생성) / slug: 고유 동 페이지 생성
const siheungDongs = [
  { name: "배곧동", life: "baegot-jeongwang", collapse: "배곧1·2동" },
  { name: "정왕동", life: "baegot-jeongwang", collapse: "정왕본동·정왕1~4동" },
  { name: "월곶동", life: "wolgot-oido" },
  { name: "대야동", life: "daeya-sincheon" },
  { name: "신천동", life: "daeya-sincheon" },
  { name: "은행동", life: "eungye-janghyeon" },
  { name: "장곡동", life: "siheung-cityhall-janghyeon" },
  { name: "능곡동", life: "mokgam-neunggok" },
  { name: "목감동", life: "mokgam-neunggok" },
  { name: "신현동", slug: "sinhyeon-dong", area: "eungye-janghyeon", focus: "신현동은 시흥 중북부의 주거 지역으로, 은계지구와 시흥시청 생활권 사이에 자리합니다." },
  { name: "매화동", slug: "maehwa-dong", area: "daeya-sincheon", focus: "매화동은 화훼단지와 농촌·주거가 섞인 시흥 동부의 지역으로, 서울 서남권·광명 인접권과 가깝습니다." },
  { name: "군자동", slug: "gunja-dong", area: "siheung-cityhall-janghyeon", focus: "군자동은 군자지구와 시흥시청 인근의 주거 지역으로, 장현·능곡 생활권과 이어집니다." },
  { name: "연성동", slug: "yeonseong-dong", area: "siheung-cityhall-janghyeon", focus: "연성동은 관곡지와 시흥시청 인근의 주거 지역으로, 장현지구 신도시와 가깝습니다." },
  { name: "과림동", slug: "gwarim-dong", area: "daeya-sincheon", focus: "과림동은 시흥 북부의 외곽 지역으로, 물류·산업 시설과 광명·부천 인접권에 자리합니다." }
];

export function dongButtonsSiheung() {
  return siheungDongs.map((x) =>
    x.life
      ? { label: x.name, url: lifeUrl("siheung", x.life), kind: "life" }
      : { label: x.name, url: `/siheung/${x.slug}/`, kind: "dong" }
  );
}

for (const x of siheungDongs) {
  if (x.life) continue;
  const url = `/siheung/${x.slug}/`;
  const pLife = lifeName(x.area);
  dongPages.push({
    slug: x.slug,
    region: "siheung",
    url,
    title: `${x.name} 출장마사지 · 시흥 생활권 안내｜간다GO`,
    description: `${x.name} 방문 전 주소·건물 출입·${pLife || "시흥"} 인접권 확인 안내.`.slice(0, 80),
    h1: `${x.name} 안내`,
    keywords: [`${x.name} 출장마사지`, `${x.name} 홈타이`, `시흥 ${x.name}`],
    breadcrumb: [crumb.home, crumb.siheung, { label: x.name, url }],
    overview: `${x.focus} 방문 위치가 아파트 단지인지 상가·주택가인지에 따라 확인할 내용이 달라, 정확한 도로명 주소와 건물 유형을 먼저 확인하는 것이 좋습니다.`,
    parentNote: `행정구역상 시흥시 ${x.name}에 속합니다. 시흥은 행정구(區)가 없어 행정동이 시 아래에 바로 편성됩니다.`,
    lifeNote: `${x.name}은 ${pLife} 생활권과 이어지는 지역으로, 개별 동 위치와 함께 넓은 ${pLife} 생활권 안내를 확인하면 방문 위치를 더 정확히 파악할 수 있습니다.`,
    nearbyNote: `${x.name}과 가까운 생활권·지하철역은 ${pLife} 안내에서 확인할 수 있으며, 인접 도시 이동권도 함께 살펴보는 것이 좋습니다.`,
    useNote: `${x.name}에서 방문형 서비스를 이용할 때는 정확한 도로명 주소와 동·호수, 공동현관 출입 방식(오피스텔·아파트 관리 규정 포함)을 먼저 확인하는 것이 좋습니다. 시흥은 신도시·산업·해안·농촌권이 섞여 있어 방문 위치의 지역 성격 확인이 특히 중요합니다.`,
    links: [{ title: "상위 생활권·지역", items: [
      { label: `${pLife} 생활권 안내`, url: lifeUrl("siheung", x.area) },
      { label: "시흥 생활권 안내", url: "/siheung/" }
    ]}],
    faq: baseFaq,
    ...whw(`시흥 ${x.name}`),
    lastUpdated: LAST_UPDATED,
    ogImage: OG,
    imageAlt: `시흥 ${x.name} 방문형 관리 안내 이미지`,
    indexPriority: 2,
    contentStatus: "ready"
  });
}
