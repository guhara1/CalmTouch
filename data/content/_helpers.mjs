// 공통 헬퍼: breadcrumb / Who-How-Why / 표준 FAQ
export const LAST_UPDATED = "2026-07-02";

export const crumb = {
  home: { label: "서부수도권 홈", url: "/" },
  incheon: { label: "인천", url: "/incheon/" },
  bucheon: { label: "부천", url: "/bucheon/" },
  siheung: { label: "시흥", url: "/siheung/" },
  corridor: { label: "연결 생활권", url: "/corridor/" },
  station: { label: "지하철역", url: "/station/" },
  use: { label: "이용 장소", url: "/use/" },
  check: { label: "예약 전 확인", url: "/check/" },
  policy: { label: "운영 기준", url: "/policy/" }
};

// 지역/생활권 페이지 기본 Who/How/Why
export function whw(place) {
  return {
    who: `이 페이지는 인천·부천·시흥 지역 방문형 서비스 안내 콘텐츠 담당팀이 작성하고 간다GO 운영 책임자가 검수합니다.`,
    how: `공식 행정구역, 주요 생활권, 가까운 지하철역, 인접 도시 이동 기준, 이용 장소별 예약 전 확인사항을 기준으로 ${place} 정보를 구성했습니다.`,
    why: `${place}에서 방문형 서비스를 찾는 이용자가 자신의 위치와 이용 장소를 안전하게 확인할 수 있도록 돕기 위해 작성했습니다.`
  };
}

// 표준 FAQ (본문 노출 = 스키마 노출)
export const baseFaq = [
  { q: "인천·부천·시흥 전 지역 방문이 가능한가요?", a: "실제 방문 주소, 가까운 생활권, 예약 가능 시간, 이동 기준을 확인한 뒤 안내합니다." },
  { q: "도시별로 따로 확인해야 하나요?", a: "인천·부천·시흥은 서로 인접하지만 구군·행정동·생활권·지하철 연결이 달라 함께 확인하는 것이 좋습니다." },
  { q: "지하철역 기준으로도 찾을 수 있나요?", a: "역명은 위치 설명에 도움이 되지만, 실제 방문 가능 여부는 주소와 건물 출입 방식까지 함께 확인해야 합니다." },
  { q: "환승역은 노선별 페이지를 따로 만드나요?", a: "아니요. 환승역도 역명 기준 1개 페이지로 관리해 중복 페이지를 줄입니다." },
  { q: "불법·선정적 서비스도 가능한가요?", a: "불법·선정적 서비스는 제공하거나 안내하지 않습니다." }
];

export const OG = "/assets/img/og-default.svg";
