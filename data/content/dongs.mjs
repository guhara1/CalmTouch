import { crumb, whw, baseFaq, LAST_UPDATED, OG } from "./_helpers.mjs";

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
    dongPages.push({
      slug: x.slug,
      region: d.region,
      districtSlug,
      url,
      title: `${x.name} 출장마사지 · ${d.regionLabel} ${d.name} 안내｜간다GO`,
      description: `${x.name} 방문 전 주소·출입·인접 생활권 확인을 안내합니다.`.slice(0, 80),
      h1: `${x.name} 안내`,
      keywords: [`${x.name} 출장마사지`, `${x.name} 홈타이`, `${d.regionLabel} ${d.name}`],
      breadcrumb: [crumb.home, crumb[d.region], { label: d.name, url: `/${d.region}/${districtSlug}/` }, { label: x.name, url }],
      overview: x.focus,
      parentNote: `행정구역상 ${d.regionLabel} ${d.name}에 속합니다.${x.collapse ? ` ${x.collapse}은 대표동 ${x.name}으로 묶어 안내합니다.` : ""}`,
      lifeNote: `${x.name}은 상위 생활권 안내와 함께 확인하면 위치를 더 정확히 파악할 수 있습니다.`,
      nearbyNote: x.station
        ? `가까운 역과 인접 지역을 함께 확인하세요.`
        : `가까운 생활권과 인접 지역을 함께 확인하세요.`,
      useNote: `${x.name}에서 방문형 서비스를 이용할 때는 정확한 도로명 주소와 건물 출입 방식(공동현관·오피스텔 관리 규정 포함)을 먼저 확인하는 것이 좋습니다.`,
      links: [{ title: "상위 생활권·역세권", items: [
        { label: "상위 생활권 안내", url: lifeUrl(d.region, x.area) },
        { label: `${d.name} 안내`, url: `/${d.region}/${districtSlug}/` },
        ...(x.station ? [{ label: "가까운 역 확인", url: `/station/${x.station}/` }] : [])
      ]}],
      faq: baseFaq,
      ...whw(`${d.regionLabel} ${d.name} ${x.name}`),
      lastUpdated: LAST_UPDATED,
      ogImage: OG,
      imageAlt: `${d.regionLabel} ${d.name} ${x.name} 안내 이미지`,
      indexPriority: 3,
      contentStatus: "draft",
      noindex: true // 도어웨이 방지: 존재·버튼·크롤 가능, 색인은 수요 확인 후(스펙 Phase 1-C)
    });
  }
}
