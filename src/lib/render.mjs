// =====================================================================
// 간다GO · 렌더링 엔진
// 레이아웃 / 헤더 / 푸터 / 스키마 / 페이지 섹션 컴포넌트
// =====================================================================
import site from "../../data/site.json" with { type: "json" };
import nav from "../../data/common/nav.json" with { type: "json" };
import authors from "../../data/common/authors.json" with { type: "json" };
import pricing from "../../data/common/pricing.json" with { type: "json" };

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const abs = (u) => (u.startsWith("http") ? u : site.baseUrl + u);

// ---------- Schema.org JSON-LD ----------
export function buildSchema(page) {
  const graph = [];

  graph.push({
    "@type": "Organization",
    "@id": site.baseUrl + "/#org",
    name: site.brand,
    url: site.baseUrl + "/",
    telephone: site.phone,
    sameAs: [site.telegram.site, site.telegram.partner],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "reservations",
      areaServed: ["인천", "부천", "시흥"],
      availableLanguage: ["Korean"]
    },
    makesOffer: pricing.courses.map((c) => ({
      "@type": "Offer",
      name: c.name,
      priceCurrency: pricing.currency,
      price: String(c.price),
      description: c.desc,
      areaServed: ["인천", "부천", "시흥"]
    }))
  });

  const image = page.ogImage ? abs(page.ogImage) : site.baseUrl + "/assets/img/og-default.svg";
  graph.push({
    "@type": "WebPage",
    "@id": abs(page.url) + "#webpage",
    url: abs(page.url),
    name: page.title,
    description: page.description,
    inLanguage: "ko-KR",
    isPartOf: { "@id": site.baseUrl + "/#website" },
    primaryImageOfPage: { "@id": abs(page.url) + "#primaryimage" },
    ...(page.lastUpdated ? { dateModified: page.lastUpdated } : {}),
    author: { "@type": "Organization", name: authors.author.name },
    reviewedBy: { "@type": "Person", name: authors.reviewer.name }
  });

  graph.push({
    "@type": "WebSite",
    "@id": site.baseUrl + "/#website",
    url: site.baseUrl + "/",
    name: site.siteName,
    inLanguage: "ko-KR",
    publisher: { "@id": site.baseUrl + "/#org" }
  });

  // ImageObject (선호 이미지 지정 — og:image와 동일 이미지 명시)
  graph.push({
    "@type": "ImageObject",
    "@id": abs(page.url) + "#primaryimage",
    url: image,
    contentUrl: image,
    caption: page.imageAlt || page.h1 || page.title
  });

  // Breadcrumb
  if (page.breadcrumb && page.breadcrumb.length) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: page.breadcrumb.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.label,
        item: abs(b.url)
      }))
    });
  }

  // FAQPage (본문에 실제 노출된 FAQ만)
  if (page.faq && page.faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": abs(page.url) + "#faq",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// ---------- 헤더 ----------
function header(page) {
  const items = nav.primary
    .map((n) => {
      const current = n.url === page.url ? ' aria-current="page"' : "";
      return `<li><a href="${n.url}"${current}>${esc(n.label)}</a></li>`;
    })
    .join("");
  return `<header class="site-header">
  <div class="container site-header__bar">
    <a class="brand-logo" href="/"><span class="brand-logo__dot" aria-hidden="true"></span>${esc(site.brand)}</a>
    <nav class="main-nav" aria-label="주요 메뉴"><ul>${items}</ul></nav>
    <a class="header-call" href="${site.phoneHref}"><span>${site.reservationLabel} ${esc(site.phone)}</span></a>
  </div>
</header>`;
}

// ---------- 푸터 (오렌지 텔레그램 문의 버튼 + 사업자 정보) ----------
function footer() {
  const cols = Object.entries(nav.footer)
    .map(
      ([title, links]) => `<div class="footer-col">
      <h4>${esc(title)}</h4>
      <ul>${links.map((l) => `<li><a href="${l.url}">${esc(l.label)}</a></li>`).join("")}</ul>
    </div>`
    )
    .join("");

  return `<footer class="site-footer">
  <div class="container footer-top">
    <div class="footer-brand">
      <a class="brand-logo" href="/"><span class="brand-logo__dot" aria-hidden="true"></span>${esc(site.brand)}</a>
      <p>인천·부천·시흥 서부수도권 생활권과 지하철역, 이용 장소별 예약 전 확인사항을 안내하는 방문형 서비스 안내 플랫폼입니다.</p>
      <div class="footer-inquiry">
        <a class="btn btn--accent" href="${site.telegram.site}" target="_blank" rel="noopener nofollow"><span class="btn__ic" aria-hidden="true">✈</span> 웹사이트 제작문의</a>
        <a class="btn btn--accent" href="${site.telegram.partner}" target="_blank" rel="noopener nofollow"><span class="btn__ic" aria-hidden="true">✈</span> 제휴문의</a>
      </div>
      <div class="footer-biz">
        <div>상호 <strong>${esc(site.brand)}</strong></div>
        <div>전화예약 <a class="footer-phone" href="${site.phoneHref}">${esc(site.phone)}</a></div>
      </div>
    </div>
    ${cols}
  </div>
  <div class="container footer-bottom">
    <span>© ${esc(site.brand)}. 인천·부천·시흥 서부수도권 생활권 안내.</span>
    <nav aria-label="정책 링크">
      <a href="/policy/privacy/">개인정보 처리방침</a>
      <a href="/policy/service-standard/">불법·선정적 서비스 불가 안내</a>
      <a href="/contact/">문의하기</a>
    </nav>
  </div>
</footer>`;
}

// ---------- Breadcrumb ----------
function breadcrumb(page) {
  if (!page.breadcrumb || !page.breadcrumb.length) return "";
  const items = page.breadcrumb
    .map((b, i) =>
      i === page.breadcrumb.length - 1
        ? `<li aria-current="page">${esc(b.label)}</li>`
        : `<li><a href="${b.url}">${esc(b.label)}</a></li>`
    )
    .join("");
  return `<nav class="breadcrumb" aria-label="경로"><div class="container"><ol>${items}</ol></div></nav>`;
}

// ---------- 신뢰 블록 (Who/How/Why + E-E-A-T byline) ----------
export function trustBlock(who, how, why) {
  return `<aside class="trust" aria-label="콘텐츠 제작 기준">
    <h3>이 페이지는 누가, 어떻게, 왜 만들었나요?</h3>
    <dl>
      <div><dt>Who · 누가</dt><dd>${esc(who)}</dd></div>
      <div><dt>How · 어떻게</dt><dd>${esc(how)}</dd></div>
      <div><dt>Why · 왜</dt><dd>${esc(why)}</dd></div>
    </dl>
    <p class="byline">작성 <a href="${authors.author.url}">${esc(authors.author.name)}</a> · 검수 <a href="${authors.reviewer.url}">${esc(authors.reviewer.name)}</a></p>
  </aside>`;
}

// ---------- FAQ ----------
export function faqBlock(faq) {
  if (!faq || !faq.length) return "";
  const items = faq
    .map(
      (f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`
    )
    .join("");
  return `<section class="section"><div class="container container--narrow">
    <h2>자주 묻는 질문</h2>
    <div class="faq">${items}</div>
  </div></section>`;
}

// ---------- 내부링크 리스트 ----------
export function linkList(title, links) {
  if (!links || !links.length) return "";
  const items = links.map((l) => `<li><a href="${l.url}">${esc(l.label)}</a></li>`).join("");
  return `<h3>${esc(title)}</h3><ul class="linklist">${items}</ul>`;
}

// ---------- 히어로/배너 이미지 (모든 지역 페이지 노출) ----------
// 교체 대상 파일: assets/img/hero.webp
export function heroImage(alt, mode = "banner") {
  const img = `<img src="/assets/img/hero.webp" alt="${esc(alt || site.brand + " 인천·부천·시흥 서부수도권 생활권 안내")}" width="1600" height="900" loading="${mode === "hero" ? "eager" : "lazy"}" decoding="async">`;
  if (mode === "hero") {
    return `<figure class="hero-media">${img}</figure>`;
  }
  return `<div class="container"><figure class="hero-media page-banner">${img}</figure></div>`;
}

// ---------- 요금표 (모든 지역 페이지 노출) ----------
export function priceTable() {
  const won = (n) => n.toLocaleString("ko-KR");
  const cards = pricing.courses
    .map((c) => {
      const reco = c.recommended;
      return `<div class="price-card${reco ? " price-card--reco" : ""}">
      ${reco ? `<span class="price-card__badge">추천</span>` : ""}
      <p class="price-card__name">${esc(c.name)}</p>
      <div class="price-card__price">${won(c.price)}<span class="won">원</span></div>
      <div class="price-card__min">${c.minutes}분</div>
      <p class="price-card__desc">${esc(c.desc)}</p>
      <a class="btn ${reco ? "btn--accent" : "btn--ghost"}" href="${site.phoneHref}">예약 문의</a>
    </div>`;
    })
    .join("");
  return `<section class="pricing" aria-label="이용 요금 안내"><div class="container">
    <div class="pricing__head"><h2>${esc(pricing.title)}</h2><p>${esc(pricing.subtitle)}</p></div>
    <div class="price-grid">${cards}</div>
    <p class="pricing__note">${esc(pricing.note)} <a href="${pricing.detailUrl}">${esc(pricing.detailLabel)} →</a></p>
  </div></section>`;
}

// ---------- 문의 CTA 밴드 ----------
export function ctaBand() {
  return `<div class="container"><section class="cta-band" aria-label="문의">
    <h2>웹사이트 제작·제휴 문의</h2>
    <p>${esc(site.brand)} · ${site.reservationLabel} ${esc(site.phone)} · 텔레그램으로 편하게 문의하세요.</p>
    <div class="hero__cta" style="justify-content:center">
      <a class="btn btn--accent btn--lg" href="${site.telegram.site}" target="_blank" rel="noopener nofollow">✈ 웹사이트 제작문의</a>
      <a class="btn btn--accent btn--lg" href="${site.telegram.partner}" target="_blank" rel="noopener nofollow">✈ 제휴문의</a>
      <a class="btn btn--ghost btn--lg" href="${site.phoneHref}">${site.reservationLabel} ${esc(site.phone)}</a>
    </div>
  </section></div>`;
}

// ---------- 페이지 셸 ----------
export function page(p, bodyHtml) {
  const desc = p.description || "";
  if (desc.length > 80) {
    console.warn(`⚠️  description ${desc.length}자(>80): ${p.url}`);
  }
  const canonical = abs(p.canonicalUrl || p.url);
  const ogImage = p.ogImage ? abs(p.ogImage) : site.baseUrl + "/assets/img/og-default.svg";
  const robots = p.noindex ? "noindex, follow" : "index, follow";
  const schema = JSON.stringify(buildSchema(p));
  const kw = (p.keywords || []).join(", ");

  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(desc)}">
${kw ? `<meta name="keywords" content="${esc(kw)}">` : ""}
<meta name="robots" content="${robots}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.siteName)}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/assets/img/favicon-16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0a0f0e">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="/assets/tokens.css">
<link rel="stylesheet" href="/assets/components.css">
<script type="application/ld+json">${schema}</script>
</head>
<body>
<a class="skip-link" href="#main">본문 바로가기</a>
${header(p)}
${breadcrumb(p)}
<main id="main">
${bodyHtml}
</main>
${footer()}
</body>
</html>`;
}

export { esc, abs };
