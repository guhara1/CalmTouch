// =====================================================================
// 간다GO · 정적 사이트 빌드
// data/* → dist/*  (정적 HTML, sitemap.xml, robots.txt)
// =====================================================================
import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import site from "./data/site.json" with { type: "json" };
import { createHash } from "node:crypto";
import { page, esc, faqBlock, trustBlock, ctaBand, linkList, buildSchema, priceTable, heroImage, reviewsBlock, longTailTopics, assets } from "./src/lib/render.mjs";
import { detailBody, articleBody } from "./src/lib/content.mjs";
import { lifeareas } from "./data/content/lifeareas.mjs";
import { corridors } from "./data/content/corridors.mjs";
import { stations } from "./data/content/stations.mjs";
import { usecases } from "./data/content/usecases.mjs";
import { checks } from "./data/content/checks.mjs";
import { policies } from "./data/content/policies.mjs";
import { hubs, main, contact } from "./data/content/hubs.mjs";
import { districts } from "./data/content/districts.mjs";
import { dongButtons, dongButtonsSiheung, dongPages } from "./data/content/dongs.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = `${ROOT}/dist`;

const collected = []; // {url, lastUpdated, noindex, priority}

async function emit(p, bodyHtml) {
  const html = page(p, bodyHtml);
  const rel = p.url === "/" ? "/index.html" : `${p.url.replace(/\/$/, "")}/index.html`;
  const out = `${DIST}${rel}`;
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html, "utf8");
  collected.push({ url: p.url, lastUpdated: p.lastUpdated, noindex: !!p.noindex, priority: p.indexPriority || 1, title: p.title, description: p.description });
}

const card = (kicker, title, desc, url, more = "자세히 보기") =>
  `<a class="card card--link" href="${url}"><span class="card__kicker">${esc(kicker)}</span><h3>${esc(title)}</h3><p>${esc(desc)}</p><span class="card__more">${esc(more)} →</span></a>`;

// ---------------- 메인 ----------------
async function buildMain() {
  const cityCards = hubs
    .map((h) => card(h.h1.split(" ")[0], h.h1.replace(/^\S+\s·\s?/, ""), h.lede, h.url, `${h.h1.split(" ")[0]} 생활권 보기`))
    .join("");

  const corridorCards = corridors
    .slice(0, 8)
    .map((c) => card("연결 생활권", c.h1.replace(" 안내", ""), c.overview.slice(0, 60) + "…", c.url, "연결권 보기"))
    .join("");

  const lifeCards = lifeareas
    .filter((l) => ["songdo-international-city", "jungdong-sinjungdong", "baegot-jeongwang", "bupyeong-station-market", "sangdong-bucheon-cityhall", "wolgot-oido"].includes(l.slug))
    .map((l) => card(l.regionLabel, l.h1.replace(" 안내", ""), l.overview.slice(0, 58) + "…", l.url, "생활권 보기"))
    .join("");

  const body = `
<section class="hero"><div class="container hero__inner">
  <span class="hero__eyebrow">간다GO · 서부수도권 생활권 안내</span>
  <h1>${esc(main.h1)}</h1>
  <p class="hero__lede">송도, 부평, 구월, 중동, 상동, 부천역, 배곧, 정왕, 은계, 장현 등 서부수도권 주요 생활권과 자택·호텔·오피스텔 이용 전 확인사항을 안내합니다.</p>
  <div class="hero__cta">
    <a class="btn btn--brand btn--lg" href="/incheon/">인천 보기</a>
    <a class="btn btn--brand btn--lg" href="/bucheon/">부천 보기</a>
    <a class="btn btn--brand btn--lg" href="/siheung/">시흥 보기</a>
    <a class="btn btn--ghost btn--lg" href="/corridor/">연결 생활권</a>
    <a class="btn btn--ghost btn--lg" href="/check/">예약 전 확인</a>
  </div>
  ${heroImage(main.imageAlt, "hero")}
</div></section>

<section class="section"><div class="container">
  <div class="section__head"><h2>도시 이름보다 실제 생활권을 함께 확인하세요</h2>
  <p>인천·부천·시흥은 서로 다른 행정구역이지만 실제 이동 생활권은 이어져 있습니다. 부평과 상동은 하나의 상권·주거 생활권으로 묶이고, 송도와 배곧은 해안 신도시 생활권으로 연결됩니다. 이 사이트는 도시별 페이지와 연결 생활권 페이지를 함께 구성해 자신의 위치를 더 정확히 확인할 수 있게 만듭니다.</p></div>
</div></section>

<section class="section section--sunken"><div class="container">
  <div class="section__head"><h2>인천·부천·시흥 지역별 안내</h2><p>도시별로 신도시·원도심·공항권·산업권·해안권 특성을 반영해 안내합니다.</p></div>
  <div class="grid grid--3">${cityCards}</div>
</div></section>

<section class="section"><div class="container">
  <div class="section__head"><h2>서부수도권 주요 생활권</h2><p>가장 많이 확인하는 대표 생활권을 먼저 안내합니다.</p></div>
  <div class="grid grid--3">${lifeCards}</div>
</div></section>

<section class="section section--sunken"><div class="container">
  <div class="section__head"><h2>도시 경계를 넘는 연결 생활권</h2><p>부평·상동, 송도·배곧처럼 도시 경계를 넘는 생활권을 함께 확인하세요.</p></div>
  <div class="grid grid--4">${corridorCards}</div>
  <p style="margin-top:1.5rem"><a class="btn btn--ghost" href="/corridor/">연결 생활권 전체 보기 →</a></p>
</div></section>

<section class="section"><div class="container container--narrow prose">
  <h2>예약 전 확인해야 할 내용</h2>
  <ul class="checklist">
    <li>방문 주소를 정확히 확인했나요?</li>
    <li>인천·부천·시흥 중 어느 도시·생활권인지 확인했나요?</li>
    <li>가까운 생활권과 지하철역을 확인했나요?</li>
    <li>인접 도시 이동권에 해당하나요?</li>
    <li>공동현관·건물 출입 방식(호텔·오피스텔 포함)을 확인했나요?</li>
    <li>산업지구·공항권·해안권·외곽 지역인지 확인했나요?</li>
    <li>개인정보 처리 기준과 불법·선정적 서비스 불가 안내를 확인했나요?</li>
  </ul>
</div></section>

${longTailTopics("인천·부천·시흥", "")}

${priceTable()}

${reviewsBlock()}

${faqBlock(main.faq)}

<section class="section"><div class="container prose">${trustBlock(main.who, main.how, main.why)}</div></section>
${ctaBand()}
<div style="height:2rem"></div>`;
  await emit(main, body);
}

// ---------------- 지역 허브 ----------------
async function buildHubs() {
  for (const h of hubs) {
    const life = lifeareas.filter((l) => l.region === h.region);
    const st = stations.filter((s) => s.region === (h.region === "incheon" ? "인천" : h.region === "bucheon" ? "부천" : "시흥"));
    const lifeCards = life.map((l) => card(h.h1.split(" ")[0], l.h1.replace(" 안내", ""), l.overview.slice(0, 60) + "…", l.url, "생활권 보기")).join("");
    const stationLinks = st.map((s) => `<li><a href="${s.url}">${esc(s.h1.replace(" 안내", ""))}</a></li>`).join("");
    const dist = districts.filter((d) => d.region === h.region);
    let distSection = dist.length ? `<section class="section"><div class="container">
  <div class="section__head"><h2>${esc(h.h1.split(" ")[0])} 구군 안내</h2><p>구별로 대표 생활권과 역세권을 정리했습니다. 세부 행정동은 각 구 페이지에서 버튼으로 확인하세요.</p></div>
  <ul class="linklist">${dist.map((d) => `<li><a href="${d.url}">${esc(d.name)} 생활권 안내</a></li>`).join("")}</ul>
</div></section>` : "";
    // 시흥: 구가 없어 행정동을 시 허브에 직접 노출
    if (h.region === "siheung") {
      const sd = dongButtonsSiheung();
      const chips = sd.map((x) => `<a class="dong-chip${x.kind === "life" ? " dong-chip--life" : ""}" href="${x.url}">${esc(x.label)}</a>`).join("");
      distSection = `<section class="section"><div class="container">
  <div class="section__head"><h2>시흥 행정동</h2><p>시흥시는 행정구(區)가 없어 행정동을 바로 안내합니다. 번호동은 대표동 1개로 묶고, 생활권 안내가 있는 동은 해당 생활권 페이지로 연결됩니다.</p></div>
  <div class="dong-grid">${chips}</div>
</div></section>`;
    }

    const body = `
<section class="hero"><div class="container hero__inner">
  <span class="hero__eyebrow">${esc(h.h1.split(" ")[0])} · 생활권 안내</span>
  <h1>${esc(h.h1)}</h1>
  <p class="hero__lede">${esc(h.lede)}</p>
  <div class="hero__cta">
    <a class="btn btn--brand btn--lg" href="/corridor/">연결 생활권 보기</a>
    <a class="btn btn--ghost btn--lg" href="/check/">예약 전 확인</a>
    <a class="btn btn--ghost btn--lg" href="/contact/">문의하기</a>
  </div>
  ${heroImage(h.imageAlt, "hero")}
</div></section>

<section class="section"><div class="container prose">
  <h2>${esc(h.h1.split(" ")[0])} 생활권을 확인하는 방법</h2>
  <p>${esc(h.intro)}</p>
</div></section>

${distSection}

<section class="section section--sunken"><div class="container">
  <div class="section__head"><h2>${esc(h.h1.split(" ")[0])} 주요 생활권</h2><p>생활권별로 신도시·원도심·산업·해안권 특성을 반영해 안내합니다.</p></div>
  <div class="grid grid--3">${lifeCards}</div>
</div></section>

<section class="section"><div class="container">
  <div class="section__head"><h2>지하철역 기준으로 찾기</h2><p>환승역도 노선별로 나누지 않고 역명 기준 1개 페이지로 안내합니다.</p></div>
  <ul class="linklist">${stationLinks}</ul>
</div></section>

${longTailTopics(h.h1.split(" ")[0], h.h1.split(" ")[0])}

${priceTable()}

${reviewsBlock()}

${faqBlock(h.faq)}
<section class="section"><div class="container prose">${trustBlock(h.who, h.how, h.why)}</div></section>
${ctaBand()}
<div style="height:2rem"></div>`;
    await emit(h, body);
  }
}

// ---------------- 구군 허브 ----------------
async function buildDistricts() {
  const stByName = (region) => stations.filter((s) => s.region === (region === "incheon" ? "인천" : region === "bucheon" ? "부천" : "시흥"));
  for (const d of districts) {
    const life = lifeareas.filter((l) => d.lifeSlugs.includes(l.slug));
    const st = stByName(d.region).filter((s) => d.stationSlugs.includes(s.slug));
    const lifeCards = life.map((l) => card(d.regionLabel, l.h1.replace(" 안내", ""), l.overview.slice(0, 60) + "…", l.url, "생활권 보기")).join("");
    const stationLinks = st.map((s) => `<li><a href="${s.url}">${esc(s.h1.replace(" 안내", ""))}</a></li>`).join("");
    const dongs = dongButtons(d.slug);
    const dongChips = dongs.map((x) => `<a class="dong-chip${x.kind === "life" ? " dong-chip--life" : ""}" href="${x.url}">${esc(x.label)}</a>`).join("");

    const body = `
${heroImage(d.imageAlt, "banner")}
<section class="section"><div class="container prose">
  <h1>${esc(d.h1)}</h1>
  <p>${esc(d.intro)}</p>
  <div class="notice">번호동(1·2·3동 등)은 대표동 1개로 묶어 안내하며, 이미 생활권 안내가 있는 동은 해당 생활권 페이지로 연결됩니다.</div>
</div></section>

${dongs.length ? `<section class="section"><div class="container">
  <div class="section__head"><h2>${esc(d.name)} 행정동</h2><p>동별 안내로 바로 이동하세요. 생활권 안내가 있는 동은 대표 생활권 페이지로 연결됩니다.</p></div>
  <div class="dong-grid">${dongChips}</div>
</div></section>` : ""}

<section class="section section--sunken"><div class="container">
  <div class="section__head"><h2>${esc(d.name)} 주요 생활권</h2><p>구 내 대표 생활권을 성격별로 안내합니다.</p></div>
  <div class="grid grid--3">${lifeCards}</div>
</div></section>

${st.length ? `<section class="section"><div class="container">
  <div class="section__head"><h2>${esc(d.name)} 지하철역</h2><p>환승역도 노선별로 나누지 않고 역명 기준 1개 페이지로 안내합니다.</p></div>
  <ul class="linklist">${stationLinks}</ul>
</div></section>` : ""}

${longTailTopics(`${d.regionLabel} ${d.name}`, d.regionLabel)}
${priceTable()}
${reviewsBlock()}
${faqBlock(d.faq)}
<section class="section"><div class="container prose">${trustBlock(d.who, d.how, d.why)}</div></section>
${ctaBand()}
<div style="height:2rem"></div>`;
    await emit(d, body);
  }
}

// ---------------- 리스트(인덱스) 페이지 ----------------
async function buildIndex(meta, items, kicker) {
  const cards = items.map((it) => card(kicker, it.h1.replace(" 안내", ""), (it.overview || it.description || "").slice(0, 62) + "…", it.url, "자세히 보기")).join("");
  const body = `
${heroImage(meta.imageAlt, "banner")}
<section class="section"><div class="container">
  <div class="section__head"><h1>${esc(meta.h1)}</h1><p>${esc(meta.lede)}</p></div>
  <div class="grid grid--3">${cards}</div>
</div></section>
${priceTable()}
${reviewsBlock()}
${ctaBand()}
<div style="height:2rem"></div>`;
  await emit(meta, body);
}

// ---------------- 문의 ----------------
async function buildContact() {
  const body = `
<section class="hero"><div class="container hero__inner">
  <span class="hero__eyebrow">간다GO · 문의</span>
  <h1>문의하기</h1>
  <p class="hero__lede">웹사이트 제작문의와 제휴문의는 아래 텔레그램으로, 예약 문의는 전화로 편하게 연락하세요.</p>
  <div class="hero__cta">
    <a class="btn btn--accent btn--lg" href="${site.telegram.site}" target="_blank" rel="noopener nofollow">✈ 웹사이트 제작문의</a>
    <a class="btn btn--accent btn--lg" href="${site.telegram.partner}" target="_blank" rel="noopener nofollow">✈ 제휴문의</a>
    <a class="btn btn--ghost btn--lg" href="${site.phoneHref}">${site.reservationLabel} ${esc(site.phone)}</a>
  </div>
</div></section>
<section class="section"><div class="container container--narrow prose">
  <h2>연락처</h2>
  <p>상호 <strong>${esc(site.brand)}</strong><br>전화예약 <a href="${site.phoneHref}">${esc(site.phone)}</a></p>
  <h2>웹사이트 제작문의 · 제휴문의</h2>
  <p>홈페이지 제작 또는 제휴 관련 문의는 텔레그램으로 남겨주시면 순차적으로 안내드립니다.</p>
  <div class="notice">개인정보 관련 안내는 <a href="/policy/privacy/">개인정보 처리방침</a>에서, 서비스 기준은 <a href="/policy/service-standard/">불법·선정적 서비스 불가 안내</a>에서 확인하세요.</div>
  ${trustBlock(contact.who, contact.how, contact.why)}
</div></section>
<div style="height:2rem"></div>`;
  await emit(contact, body);
}

// ---------------- sitemap / robots ----------------
async function buildSitemap() {
  const urls = collected
    .filter((c) => !c.noindex)
    .sort((a, b) => a.priority - b.priority)
    .map((c) => `  <url>\n    <loc>${site.baseUrl}${c.url}</loc>\n    <lastmod>${c.lastUpdated || "2026-07-02"}</lastmod>\n    <priority>${c.url === "/" ? "1.0" : c.priority === 1 ? "0.8" : "0.5"}</priority>\n  </url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(`${DIST}/sitemap.xml`, xml, "utf8");

  // robots.txt — 구글(Googlebot)·네이버(Yeti)·빙 등 전체 허용 + 사이트맵 명시
  const robots = [
    "User-agent: *",
    "Allow: /",
    "",
    "User-agent: Yeti",       // 네이버
    "Allow: /",
    "",
    "User-agent: Googlebot",
    "Allow: /",
    "",
    `Sitemap: ${site.baseUrl}/sitemap.xml`,
    `Sitemap: ${site.baseUrl}/rss.xml`,
    ""
  ].join("\n");
  await writeFile(`${DIST}/robots.txt`, robots, "utf8");

  // RSS 2.0 피드 — 색인 발견 촉진(네이버 서치어드바이저 RSS 제출 대응). 최신 lastmod 순 상위 40개.
  const esc2 = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const feed = collected
    .filter((c) => !c.noindex)
    .slice()
    .sort((a, b) => String(b.lastUpdated).localeCompare(String(a.lastUpdated)) || a.priority - b.priority)
    .slice(0, 40);
  const rssItems = feed
    .map((c) => {
      const loc = `${site.baseUrl}${c.url}`;
      const d = new Date(`${c.lastUpdated || "2026-07-02"}T09:00:00+09:00`).toUTCString();
      return `    <item>\n      <title>${esc2(c.title || site.brand)}</title>\n      <link>${loc}</link>\n      <guid isPermaLink="true">${loc}</guid>\n      <pubDate>${d}</pubDate>\n      <description>${esc2(c.description || "")}</description>\n    </item>`;
    })
    .join("\n");
  const pub = new Date("2026-07-02T09:00:00+09:00").toUTCString();
  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${esc2(site.siteName)} · 인천·부천·시흥 서부수도권 생활권 안내</title>\n    <link>${site.baseUrl}/</link>\n    <atom:link href="${site.baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>\n    <description>인천·부천·시흥 서부수도권 생활권·지하철역·예약 전 확인 안내</description>\n    <language>ko</language>\n    <lastBuildDate>${pub}</lastBuildDate>\n${rssItems}\n  </channel>\n</rss>\n`;
  await writeFile(`${DIST}/rss.xml`, rss, "utf8");
}

// ---------------- 404 ----------------
async function build404() {
  const p = { url: "/404", title: "페이지를 찾을 수 없습니다 · 간다GO", description: "요청하신 페이지를 찾을 수 없습니다. 홈에서 다시 확인하세요.", h1: "404", breadcrumb: [{ label: "홈", url: "/" }], noindex: true, ogImage: "/assets/img/og-default.svg", noReviews: true };
  const body = `<section class="section"><div class="container container--narrow prose" style="text-align:center;padding:4rem 0">
    <h1 style="font-size:3rem">404</h1>
    <p>요청하신 페이지를 찾을 수 없습니다.</p>
    <p><a class="btn btn--brand" href="/">서부수도권 홈으로</a></p>
  </div></section>`;
  const html = page(p, body);
  await writeFile(`${DIST}/404.html`, html, "utf8");
}

// ---------------- 실행 ----------------
async function run() {
  if (existsSync(DIST)) await rm(DIST, { recursive: true });
  await mkdir(`${DIST}/assets/img`, { recursive: true });
  // CSS 내용 해시 지문 → 캐시 무효화(immutable 캐시와 안전하게 공존)
  const hashOf = (buf) => createHash("sha1").update(buf).digest("hex").slice(0, 10);
  const tokensCss = await readFile(`${ROOT}/src/styles/tokens.css`);
  const compCss = await readFile(`${ROOT}/src/styles/components.css`);
  const th = hashOf(tokensCss);
  const ch = hashOf(compCss);
  await writeFile(`${DIST}/assets/tokens.${th}.css`, tokensCss);
  await writeFile(`${DIST}/assets/components.${ch}.css`, compCss);
  assets.css = [`/assets/tokens.${th}.css`, `/assets/components.${ch}.css`];
  // 이미지/파비콘 등 assets/img 전체 복사 (og, favicon.svg, PNG 아이콘들)
  await cp(`${ROOT}/assets/img`, `${DIST}/assets/img`, { recursive: true });

  // 웹 앱 매니페스트
  const manifest = {
    name: site.brand,
    short_name: site.brand,
    description: "인천·부천·시흥 서부수도권 생활권 안내",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f0e",
    theme_color: "#0a0f0e",
    icons: [
      { src: "/assets/img/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/img/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/assets/img/favicon.svg", sizes: "any", type: "image/svg+xml" }
    ]
  };
  await writeFile(`${DIST}/site.webmanifest`, JSON.stringify(manifest, null, 2), "utf8");

  await buildMain();
  await buildHubs();
  await buildDistricts();

  for (const dp of dongPages) await emit(dp, detailBody(dp));
  for (const l of lifeareas) await emit(l, detailBody(l));
  for (const c of corridors) await emit(c, detailBody(c));
  for (const s of stations) await emit(s, detailBody(s));
  for (const u of usecases) await emit(u, detailBody(u));
  for (const c of checks) await emit(c, detailBody(c));
  for (const p of policies) await emit(p, articleBody(p, p.bodyHtml));

  await buildIndex({ url: "/corridor/", title: "인천·부천·시흥 출장마사지 · 연결 생활권 안내｜간다GO", description: "인천·부천·시흥 도시 경계를 넘는 연결 생활권을 안내합니다.", h1: "연결 생활권", lede: "도시 경계를 넘는 이동 기준·인접 생활권·예약 전 확인을 안내합니다.", keywords: ["연결 생활권", "서부수도권 이동권"], breadcrumb: [{ label: "서부수도권 홈", url: "/" }, { label: "연결 생활권", url: "/corridor/" }], ogImage: "/assets/img/og-default.svg", indexPriority: 1, lastUpdated: "2026-07-02" }, corridors, "연결 생활권");

  await buildIndex({ url: "/station/", title: "인천·부천·시흥 출장마사지 · 지하철역 안내｜간다GO", description: "인천·부천·시흥 주요 지하철역 기준 생활권 안내입니다.", h1: "지하철역 기준 안내", lede: "환승역도 노선별로 나누지 않고 역명 기준 1개 페이지로 안내합니다.", keywords: ["지하철역 안내", "역세권"], breadcrumb: [{ label: "서부수도권 홈", url: "/" }, { label: "지하철역", url: "/station/" }], ogImage: "/assets/img/og-default.svg", indexPriority: 1, lastUpdated: "2026-07-02" }, stations, "역세권");

  await buildIndex({ url: "/use/", title: "이용 장소별 안내｜자택·호텔·오피스텔 · 간다GO", description: "자택·호텔·오피스텔 등 이용 장소별 예약 전 확인을 안내합니다.", h1: "이용 장소별 안내", lede: "이용 장소에 따라 확인해야 할 주소·출입·이동 기준이 다릅니다.", keywords: ["이용 장소 안내"], breadcrumb: [{ label: "서부수도권 홈", url: "/" }, { label: "이용 장소", url: "/use/" }], ogImage: "/assets/img/og-default.svg", indexPriority: 1, lastUpdated: "2026-07-02" }, usecases, "이용 장소");

  await buildIndex({ url: "/check/", title: "예약 전 확인 안내｜주소·출입·이동비 · 간다GO", description: "방문 주소·건물 출입·이동비 등 예약 전 확인사항을 안내합니다.", h1: "예약 전 확인 안내", lede: "안전하고 정확한 예약을 위해 확인해야 할 내용을 모았습니다.", keywords: ["예약 전 확인"], breadcrumb: [{ label: "서부수도권 홈", url: "/" }, { label: "예약 전 확인", url: "/check/" }], ogImage: "/assets/img/og-default.svg", indexPriority: 1, lastUpdated: "2026-07-02" }, checks, "예약 전 확인");

  await buildIndex({ url: "/policy/", title: "운영 기준 안내｜개인정보·서비스 기준 · 간다GO", description: "개인정보 처리방침, 서비스 기준 등 간다GO 운영 기준 안내입니다.", h1: "운영 기준", lede: "개인정보 처리방침, 콘텐츠 작성 기준, 서비스 기준을 안내합니다.", keywords: ["운영 기준", "개인정보 처리방침"], breadcrumb: [{ label: "서부수도권 홈", url: "/" }, { label: "운영 기준", url: "/policy/" }], ogImage: "/assets/img/og-default.svg", indexPriority: 2, lastUpdated: "2026-07-02" }, policies, "운영 기준");

  await buildContact();
  await build404();
  await buildSitemap();

  console.log(`✅ 빌드 완료: ${collected.length} 페이지 → dist/`);
}

run().catch((e) => { console.error(e); process.exit(1); });
