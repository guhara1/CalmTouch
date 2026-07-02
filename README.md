# 간다GO · 인천·부천·시흥 서부수도권 생활권 안내

Pretendard + 토큰 시스템 기반의 정적 사이트 생성기입니다. `data/`의 JSON/JS 데이터를 읽어
`dist/`에 SEO·스키마가 적용된 정적 HTML을 생성합니다.

## 빌드

```bash
node build.mjs      # dist/ 생성
npm run serve       # 빌드 후 http://localhost:4321 로컬 서버
```

Node 20+ 필요. 외부 런타임 의존성 없음(빌드 순수 Node). 배포는 `main` 푸시 시
GitHub Actions(`.github/workflows/deploy.yml`)가 GitHub Pages로 배포합니다.

## 구조

```
data/
  site.json               브랜드·전화·텔레그램·권위 링크 등 전역 설정
  common/
    nav.json              상단/하단 내비게이션
    authors.json          E-E-A-T 작성자·검수자
    pricing.json          요금표(60/90/120분) — 모든 지역 페이지 노출
  content/
    hubs.mjs              메인 + 인천/부천/시흥 허브 + 문의
    lifeareas.mjs         생활권 상세(인천·부천·시흥)
    corridors.mjs         연결 생활권(도시 경계 이동권)
    stations.mjs          역세권(환승역도 역명 기준 1URL)
    usecases.mjs / checks.mjs / policies.mjs
src/
  styles/tokens.css       프리미엄 팔레트 + Pretendard 디자인 토큰
  styles/components.css   컴포넌트 오버레이(헤더/푸터/카드/요금표 등)
  lib/render.mjs          레이아웃·헤더·푸터·스키마·요금표 렌더러
  lib/content.mjs         상세페이지 본문 섹션 빌더
build.mjs                 오케스트레이션 → dist/
```

## SEO / 구조화 데이터

- 페이지별 `<title>`, ≤80자 메타 디스크립션, canonical, robots(noindex 관리), OG/Twitter.
- JSON-LD `@graph`: `Organization`(요금 `makesOffer` 포함), `WebSite`, `WebPage`,
  `ImageObject`(og:image와 동일 이미지 명시), `BreadcrumbList`, `FAQPage`(본문 노출 FAQ만).
- 가짜 후기·평점 및 실제 매장 없는 `LocalBusiness` 스키마는 사용하지 않음.
- `sitemap.xml`, `robots.txt` 자동 생성. 모든 페이지 단일 `<h1>`.
- 내부링크는 "송도국제도시 생활권 안내" 같은 롱테일·설명형 앵커 사용.

## ⚠️ 배포 전 반드시 교체할 값 (`data/site.json`)

- `baseUrl` — 실제 도메인
- `telegram.site` / `telegram.partner` — **현재 임시 플레이스홀더**(`t.me/gandago_*`).
  실제 텔레그램 핸들로 교체하세요. 푸터·문의·요금표의 "웹사이트 제작문의 / 제휴문의" 버튼이 이 값을 사용합니다.
