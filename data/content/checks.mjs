import { crumb, whw, baseFaq, LAST_UPDATED, OG } from "./_helpers.mjs";

const raw = [
  { slug: "address", title: "방문 주소 확인",
    overview: "예약 전 가장 먼저 확인해야 할 것은 정확한 방문 주소입니다. 인천·부천·시흥은 인접 도시 생활권이 이어져 있어, 도로명 주소와 함께 어느 도시·생활권인지 확인해야 안내가 정확해집니다.",
    lifeNote: "인천 송도·청라·검단 등 신도시는 단지명·동·호수가, 부천은 3구 37동의 다세대 주소가, 시흥 배곧·은계·장현은 신축 단지 주소가 최신인지 확인이 필요합니다.",
    useNote: "방문 주소는 도로명 주소, 공동주택 동·호수, 상가·오피스텔의 건물명과 층을 순서대로 확인합니다." },
  { slug: "building-access", title: "건물 출입 방식",
    overview: "건물 출입 방식은 공동현관 비밀번호, 호출 방식, 카드키 여부에 따라 달라집니다. 방문 위치가 아파트·오피스텔·상가·호텔인지에 따라 확인할 내용이 다릅니다.",
    lifeNote: "오피스텔·주상복합이 많은 인천 송도, 부천 중동·상동, 시흥 배곧은 공동현관과 엘리베이터 카드키 확인이 특히 중요합니다.",
    useNote: "건물 출입 방식은 공동현관 비밀번호 또는 호출 방식, 엘리베이터 카드키 여부, 관리사무소 방문 규정을 확인합니다." },
  { slug: "travel-fee", title: "추가 이동비 기준",
    overview: "추가 이동비는 이동 거리와 지역에 따라 발생할 수 있습니다. 신도시·산업지구·공항권·해안권·외곽 지역은 이동 시간이 길어 사전 확인이 필요합니다.",
    lifeNote: "인천 공항권·강화, 시흥 시화산단·월곶·오이도 해안권, 부천 외곽 경계 지역은 이동 시간이 길어 추가 이동비를 사전에 확인하는 것이 좋습니다.",
    useNote: "추가 이동비는 방문 지역, 이동 소요 시간, 야간 여부에 따라 달라질 수 있어 예약 시 함께 확인합니다." },
  { slug: "time", title: "예약 가능 시간",
    overview: "예약 가능 시간은 방문 위치와 건물 출입 조건에 따라 달라질 수 있습니다. 야간에는 상가·오피스텔의 출입이 제한되는 경우가 있습니다.",
    lifeNote: "인천·부천·시흥 모두 상가 건물은 야간 출입이 제한될 수 있어, 예약 가능 시간과 야간 출입 방식을 함께 확인해야 합니다.",
    useNote: "예약 가능 시간은 방문 희망 시간, 야간 출입 가능 여부, 이동 소요 시간을 고려해 확인합니다." },
  { slug: "change-policy", title: "예약 변경 기준",
    overview: "예약 변경은 시간·위치 변경 시 확인이 필요합니다. 이동이 시작된 이후에는 위치 변경이 어려울 수 있어, 변경이 필요한 경우 빠르게 연락하는 것이 좋습니다.",
    lifeNote: "도시 경계를 넘는 연결 생활권으로 위치를 변경하는 경우, 이동 시간과 추가 이동비가 달라질 수 있어 변경 전 확인이 필요합니다.",
    useNote: "예약 변경 시에는 변경 희망 시간·위치, 이동 조건 변화, 추가 이동비 변동 여부를 확인합니다." },
  { slug: "privacy", title: "개인정보 처리 기준",
    overview: "간다GO는 예약 확인과 연락에 필요한 최소한의 정보만 안내합니다. 수집·이용 목적이 달성되면 관련 기준에 따라 처리합니다. 자세한 내용은 개인정보 처리방침에서 확인할 수 있습니다.",
    lifeNote: "예약 시 제공하는 연락처와 방문 주소는 예약 확인과 안내 목적으로만 사용되며, 목적 외 이용을 하지 않습니다.",
    useNote: "개인정보 관련 확인 시에는 수집 항목, 이용 목적, 보관 기준을 개인정보 처리방침에서 확인합니다." },
  { slug: "service-policy", title: "불법·선정적 서비스 불가 안내",
    overview: "간다GO는 불법·선정적 서비스를 제공하거나 안내하지 않습니다. 이 사이트는 방문형 서비스의 위치·이용 장소·예약 전 확인사항을 안내하는 정보 제공을 목적으로 합니다.",
    lifeNote: "지역·생활권·역세권 안내는 이용자가 위치와 이용 장소를 정확히 확인하도록 돕기 위한 것으로, 불법·선정적 서비스와는 무관합니다.",
    useNote: "서비스 기준 확인 시에는 제공 가능한 안내 범위와 불가 사항을 불법·선정적 서비스 불가 안내에서 확인합니다." },
  { slug: "customer-notice", title: "고객 유의사항",
    overview: "고객 유의사항은 안전하고 정확한 예약을 위해 확인해야 할 내용을 모은 안내입니다. 방문 주소, 건물 출입, 예약 시간, 개인정보, 서비스 기준을 종합적으로 확인하세요.",
    lifeNote: "인천·부천·시흥의 도시 경계와 생활권이 이어져 있어, 방문 위치를 정확히 확인하는 것이 가장 중요한 유의사항입니다.",
    useNote: "고객 유의사항 확인 시에는 방문 주소·출입 방식·예약 시간·이동비·개인정보·서비스 기준을 순서대로 확인합니다." }
];

const dedup = (s) => s.replace(/안내 안내/g, "안내");

export const checks = raw.map((r) => ({
  slug: r.slug,
  url: `/check/${r.slug}/`,
  title: dedup(`${r.title} 안내｜인천·부천·시흥 예약 전 확인 · 간다GO`),
  description: dedup(`예약 전 ${r.title} 방법과 도시별 확인 기준을 안내합니다.`).slice(0, 80),
  h1: `인천·부천·시흥 예약 전 ${r.title}`,
  keywords: [r.title, "예약 전 확인", "인천 부천 시흥 방문형 서비스"],
  breadcrumb: [crumb.home, crumb.check, { label: r.title, url: `/check/${r.slug}/` }],
  overview: r.overview,
  lifeNote: r.lifeNote,
  useNote: r.useNote,
  links: [{ title: "다른 확인사항·정책", items: [
    { label: "방문 주소 확인", url: "/check/address/" },
    { label: "건물 출입 방식", url: "/check/building-access/" },
    { label: "개인정보 처리방침", url: "/policy/privacy/" },
    { label: "불법·선정적 서비스 불가 안내", url: "/policy/service-standard/" }
  ]}],
  faq: baseFaq,
  ...whw(r.title),
  lastUpdated: LAST_UPDATED,
  ogImage: OG,
  imageAlt: dedup(`인천 부천 시흥 예약 전 ${r.title} 안내 이미지`),
  indexPriority: 1,
  contentStatus: "ready"
}));
