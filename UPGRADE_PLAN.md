# 원본 revealjs 스킬 기준 업그레이드 계획

원본: `refer-upstream/` (ryanbbrown/revealjs-skill)
원칙: **원본에 있는 건 넣고, 색상/폰트만 토큰 변수(`--slide-color-*`)로 바꾼다.**

---

## 파일별 업그레이드

### 1. enhance/advanced-features.md (86줄 → 원본 143줄 기준)

원본 `refer-upstream/references/advanced-features.md`를 복사하고 하드코딩 색상을 토큰 변수로 치환.

| 누락 항목 | 원본 | 토큰 적용 |
|----------|------|----------|
| Auto-Animate: box 예제 | `background: blue/red` | `var(--slide-color-primary/secondary)` |
| Background: radial-gradient | `radial-gradient(#283b95, #17b2c3)` | `radial-gradient(var(--slide-color-primary), var(--slide-color-secondary))` |
| Background: data-background-size | `contain` | 그대로 |
| Transition: convex, concave, none | 목록 | 그대로 |
| Slide Visibility | hidden, uncounted | 그대로 |
| Code Highlight: static | `data-line-numbers="3,5-7"` | 그대로 |
| Code Highlight: 지원 언어 목록 | 12개 | 그대로 |

### 2. enhance/charts.md (87줄 → 원본 426줄 기준)

원본 `refer-upstream/references/charts.md`를 복사하고 하드코딩 색상을 토큰 변수로 치환.

| 누락 항목 | 토큰 적용 |
|----------|----------|
| Half horizontal (left/right) 레이아웃 | `#2196F3` → `var(--slide-color-primary)` |
| Half vertical (top/bottom) 레이아웃 | 동일 |
| Quarter/quadrant 레이아웃 | 동일 |
| Unequal split (1fr 2fr, 1fr 3fr) | 동일 |
| "Why this pattern works" 설명 | 그대로 |
| CSV 데이터 형식 | 그대로 |
| 외부 CSV 파일 | 그대로 |
| chart type: bubble | 그대로 |
| 스타일링 가이드 (legend, axis 등) | 그대로 |
| 색상 배열 예시 | 토큰 변수 배열로 교체 |

### 3. check/check-charts.js (신규)

원본 `refer-upstream/scripts/check-charts.js` (195줄) 그대로 복사.
`skills/check/SKILL.md`에 차트 검증 안내 추가.

### 4. scaffold/create-from-export.js (보강)

HTML 템플릿 `<head>`에 자동 포함:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chart/plugin.js"></script>
```

`Reveal.initialize()`에 `RevealChart` 플러그인 추가.

### 5. fill/SKILL.md (보강)

| 추가 항목 | 내용 |
|----------|------|
| Font Awesome 아이콘 | `<i class="fa-solid fa-lightbulb"></i>` 예시 |
| r-fit-text, r-stretch | reveal.js 내장 클래스 안내 |
| blockquote | 스타일 사용법 |

---

## 변경하지 않는 것

- `check-overflow.js` — 원본과 동일
- `edit-html.js` — 원본과 동일
- `skills/studio/` — 우리 고유
- `skills/review/SKILL.md` — 이미 완성
- `create-from-export.js` 핵심 로직 — Studio 입력 방식 유지
- `enhance/SKILL.md` — 이미 최신 (Fragment 전체 목록, r-fit-text 등 포함)

---

## 검증 방법

- `grep -r '#[0-9a-fA-F]\{6\}' skills/` — 하드코딩 색상 잔재 없는지 확인
- 커맨드명 `/slide-master-reveal:*` 일관성 확인
- 토큰 변수 `--slide-color-*` 형태 통일 확인
