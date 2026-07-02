// =====================================================================
// 간다GO · 본문 섹션 빌더
// 페이지별 구조화 데이터 → 차별화된 한국어 본문 섹션 생성
// (지역명만 바꾼 얇은 본문이 아니라 page.focus / nearby / useNote 등
//  페이지 고유 필드를 실제 문장에 반영)
// =====================================================================
import { esc, faqBlock, trustBlock, linkList, ctaBand, priceTable } from "./render.mjs";

const p = (t) => `<p>${t}</p>`;

// 이용 장소 기준 공통 문단 (페이지 focus에 맞춰 앞부분이 달라짐)
function useGuidance(page) {
  const f = page.useNote || "자택·호텔·오피스텔 등 이용 장소에 따라 확인해야 할 내용이 다릅니다.";
  return `<h2>이용 장소별 확인 기준</h2>
  ${p(esc(f))}
  ${p(`<strong>자택 이용</strong> 시에는 정확한 도로명 주소와 공동주택의 동·호수, 공동현관 출입 방식을 미리 확인합니다. <strong>호텔·숙소 이용</strong> 시에는 객실 방문 가능 여부와 숙소 정책을 먼저 확인하고, <strong>오피스텔 이용</strong> 시에는 공동현관 비밀번호, 엘리베이터 카드키, 관리사무소 방문 규정과 방문 가능 시간대를 확인합니다.`)}
  ${page.areaTypeNote ? p(esc(page.areaTypeNote)) : ""}
  ${p(`이동 거리에 따라 추가 이동비가 발생할 수 있으므로, 예약 전에 <a href="/check/travel-fee/">추가 이동비 기준</a>과 <a href="/check/time/">예약 가능 시간</a>을 함께 확인하는 것을 권장합니다.`)}`;
}

// 예약 전 확인 공통 섹션
function checkSection() {
  return `<h2>예약 전 확인사항</h2>
  ${p("예약 전에는 방문 주소와 건물 출입 방식, 예약 가능 시간, 추가 이동비 기준을 순서대로 확인하는 것이 좋습니다. 특히 인천·부천·시흥은 인접 도시 생활권이 이어져 있어, 실제 방문 위치가 어느 도시·생활권에 해당하는지 먼저 확인해야 안내가 정확해집니다.")}
  <ul class="checklist">
    <li>방문 주소(도로명·동·호수)를 정확히 확인했나요?</li>
    <li>인천·부천·시흥 중 어느 도시·생활권인지 확인했나요?</li>
    <li>가까운 지하철역과 인접 도시 이동권을 확인했나요?</li>
    <li>공동현관·건물 출입 방식(호텔·오피스텔 포함)을 확인했나요?</li>
    <li>예약 가능 시간과 추가 이동비 기준을 확인했나요?</li>
  </ul>`;
}

// 운영/개인정보/불법서비스 안내 공통 섹션
function policySection() {
  return `<h2>개인정보 처리와 서비스 기준</h2>
  ${p(`예약 확인과 연락에 필요한 최소한의 정보만 안내하며, 자세한 내용은 <a href="/policy/privacy/">개인정보 처리방침</a>에서 확인할 수 있습니다.`)}
  <div class="notice notice--danger">${esc("간다GO는 불법·선정적 서비스를 제공하거나 안내하지 않습니다. 자세한 기준은 불법·선정적 서비스 불가 안내에서 확인하세요.")} <a href="/policy/service-standard/" style="color:inherit;font-weight:700">자세히 보기</a></div>`;
}

// 표준 상세페이지(지역/생활권/연결권/역세권/이용/확인) 조립
export function detailBody(page) {
  const secs = [];

  // 1) 개요 (페이지 H1)
  secs.push(`<section class="section"><div class="container prose">
    <h1>${esc(page.h1)}</h1>
    ${p(esc(page.overview))}
    ${page.parentNote ? p(esc(page.parentNote)) : ""}
  </div></section>`);

  // 2) 생활권 / 가까운 역·인접 지역
  const nearHtml = [];
  if (page.lifeNote) nearHtml.push(`<h2>생활권 안내</h2>${p(esc(page.lifeNote))}`);
  if (page.nearbyNote) nearHtml.push(`<h2>가까운 역·인접 지역</h2>${p(esc(page.nearbyNote))}`);
  if (nearHtml.length) {
    secs.push(`<section class="section section--sunken"><div class="container prose">${nearHtml.join("")}</div></section>`);
  }

  // 3) 이용 장소 기준 + 예약 전 확인 + 정책
  secs.push(`<section class="section"><div class="container prose">
    ${useGuidance(page)}
    ${checkSection()}
    ${policySection()}
  </div></section>`);

  // 4) 내부링크 (키워드 롱테일 앵커)
  if (page.links && page.links.length) {
    const groups = page.links
      .map((g) => linkList(g.title, g.items))
      .join("");
    secs.push(`<section class="section section--sunken"><div class="container">
      <div class="section__head"><h2>관련 지역·생활권 안내</h2><p>아래 링크로 인접 생활권과 이용 기준을 이어서 확인하세요.</p></div>
      ${groups}
    </div></section>`);
  }

  // 5) 요금표 (모든 지역 페이지 노출)
  secs.push(priceTable());

  // 6) FAQ
  secs.push(faqBlock(page.faq));

  // 7) 신뢰 블록 + 문의 CTA
  secs.push(`<section class="section"><div class="container prose">
    ${trustBlock(page.who, page.how, page.why)}
  </div></section>`);
  secs.push(ctaBand());
  secs.push('<div style="height:2rem"></div>');

  return secs.join("\n");
}

// 정책/안내형(장문 프로즈 그대로) 페이지 조립
export function articleBody(page, innerHtml) {
  return `<section class="section"><div class="container prose">
    <h1>${esc(page.h1)}</h1>
    ${innerHtml}
    ${page.faq ? "" : ""}
  </div></section>
  ${faqBlock(page.faq)}
  <section class="section"><div class="container prose">${trustBlock(page.who, page.how, page.why)}</div></section>
  ${ctaBand()}
  <div style="height:2rem"></div>`;
}
