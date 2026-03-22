# Slide Master Reveal

Claude Code plugin for generating reveal.js presentations from Slide Master project files.

Design tokens and layout structures created in Studio are automatically applied — colors, typography, spacing, and frame settings flow into every generated slide.

## Features

- **Body Separation** — Fill edits only `slides/slide-N-body.html`, structure is protected in template
- **Design Token Integration** — All colors, fonts, spacing use `var(--slide-color-*)` CSS variables from Studio
- **Overflow Protection** — Mandatory Puppeteer-based overflow check after content creation
- **Interactive Content** — Add text, images, tables, SVG infographics through conversational fill
- **reveal.js Plugins** — Notes (S key), Highlight (code blocks), Search (Ctrl+Shift+F), Chart.js
- **Narration Bar** — Toast-style narration overlay on slides, added via body files
- **Speaker Notes** — Separate notes files assembled into `<aside class="notes">`

## Install

```bash
# Claude Code에서
/plugin marketplace add bhcha/slide-master-reveal
```

## Dependencies

check 및 review 스킬 실행에 필요:

```bash
cd <plugin-root>
npm install    # puppeteer (overflow 검사), cheerio (차트 검증)
```

decktape은 `npx`로 자동 설치됩니다.

## Skills

| Skill | Description |
|-------|-------------|
| `/studio` | 브라우저에서 Studio 에디터 열기 (포트 4173) |
| `/scaffold` | 프로젝트 파일 → template + body/notes 파일 + CSS 생성 |
| `/fill` | `slides/slide-N-body.html` 편집 → assemble → overflow 검사 |
| `/enhance` | 차트, Fragment, Auto-Animate, 트랜지션, 배경, 나레이션 바 |
| `/check` | Puppeteer로 모든 슬라이드 overflow 검사 |
| `/review` | decktape으로 스크린샷 촬영 + 시각 검증 |
| `/edit` | 브라우저에서 텍스트 직접 편집 (오타 수정용) |

## Workflow

```
/studio      → 마스터 설정 + 덱 구조 설계, .json 저장
     ↓
/scaffold    → index.template.html + slides/*.html + styles.css
     ↓
/fill        → body 파일에 콘텐츠 채움 → assemble → check
     ↓
/enhance     → 차트, 애니메이션, 트랜지션, 나레이션 바
     ↓
/check       → overflow 자동 검사
     ↓
/review      → 스크린샷 촬영 + 시각 검증
```

## Generated Structure

```
presentation/
├── index.template.html        ← 레이아웃 구조 + <!--BODY/NOTES--> 마커
├── index.html                 ← assemble 결과 (최종)
├── styles.css                 ← Studio 디자인 토큰 CSS
└── slides/
    ├── slide-1-body.html      ← fill이 편집 (콘텐츠 + 나레이션 바)
    ├── slide-1-notes.html     ← fill/enhance가 편집 (발표자 노트)
    ├── slide-2-body.html
    ├── slide-2-notes.html
    └── ...
```

### Body File Example

```html
<!-- Slide 1 body: header-body-footer -->
<!-- 가용 높이: ~430px. 이 높이를 넘기지 마세요. -->
<div class="slide-grid-2">
  <div class="card">
    <h2>맑음</h2>
    <p>서울 18° · 대전 19°</p>
  </div>
  <div class="card">
    <h2>비 예보</h2>
    <p>광주 17° · 제주 16°</p>
  </div>
</div>
```

### Assemble

body/notes 파일을 수정한 후 index.html을 재생성:

```bash
node <plugin-root>/skills/scaffold/assemble.js --dir <프레젠테이션>
```

## Available CSS Classes

| Class | Purpose |
|-------|---------|
| `.card` | 카드 (border + radius) |
| `.badge` / `.badge--secondary` | 라벨 뱃지 |
| `.overlay-bar` | 다크 오버레이 바 |
| `.slide-grid-2` / `.slide-grid-3` | 2열 / 3열 그리드 |
| `.text-lg` ~ `.text-3xl` | 텍스트 크기 확대 |
| `.text-muted` / `.text-center` / `.font-bold` | 텍스트 유틸리티 |
| `.footnote` | 하단 각주 (absolute) |
| `.slide-narration-wrap > .slide-narration-bar` | 나레이션 바 (토스트) |
| `r-fit-text` / `r-stretch` / `r-stack` | reveal.js 내장 |

## Color Tokens

모든 색상은 `var(--slide-color-*)` 토큰을 사용합니다:

| Token | Purpose |
|-------|---------|
| `--slide-color-primary` | 주요 강조색 |
| `--slide-color-secondary` | 보조 색상 |
| `--slide-color-background` | 슬라이드 배경 |
| `--slide-color-surface` | 카드/컨테이너 배경 |
| `--slide-color-text` | 기본 텍스트 |
| `--slide-color-text-muted` | 흐린 텍스트 |
| `--slide-color-text-secondary` | 보조 텍스트 |
| `--slide-color-border` | 테두리 |
| `--slide-color-overlay` | 오버레이 배경 |
| `--slide-color-on-primary` | primary 위 텍스트 |
| `--slide-color-on-overlay` | overlay 위 텍스트 |

## Repository Structure

```
slide-master-reveal/
├── .claude-plugin/plugin.json
├── skills/
│   ├── studio/          # Studio 에디터 서빙 (dist/ 포함)
│   ├── scaffold/        # create-from-export.js + assemble.js
│   ├── fill/            # 대화형 콘텐츠 채우기
│   ├── enhance/         # 차트, 애니메이션, 미디어 효과
│   ├── check/           # overflow + 차트 검증 (Puppeteer, cheerio)
│   ├── review/          # 스크린샷 리뷰 (decktape)
│   └── edit/            # 브라우저 텍스트 편집 서버
├── refer-upstream/      # 원본 참조용 (실행에 사용하지 않음)
└── README.md
```

## Based On

[ryanbbrown/revealjs-skill](https://github.com/ryanbbrown/revealjs-skill)을 기반으로 Slide Master 디자인 토큰 시스템에 맞게 재구성했습니다.
