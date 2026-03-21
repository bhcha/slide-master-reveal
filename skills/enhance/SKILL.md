---
description: 차트, 프래그먼트, 트랜지션, 배경, auto-animate 등 고급 기능 적용
---

# Enhance

reveal.js 고급 기능을 프레젠테이션에 적용합니다.

> 상세 레퍼런스: [advanced-features.md](advanced-features.md), [charts.md](charts.md)

> **편집 규칙:**
> - body 내부 효과 (fragment, r-stack 등): `slides/slide-N-body.html` 편집 → assemble 실행
> - section 레벨 속성 (data-transition, data-background 등): `index.template.html`의 `<section>` 태그 속성만 편집 가능
> - 레이아웃 구조 (layout-*, .slide, .slide-header, .slide-footer) 변경 금지
> - assemble: `node ${CLAUDE_SKILL_DIR}/../scaffold/assemble.js --dir <프레젠테이션>`

## 사용법

```
/slide-master-reveal:enhance <지시사항>
```

## 사용 예시

```
/slide-master-reveal:enhance 슬라이드 2에 카드를 하나씩 나타나게 해줘
/slide-master-reveal:enhance 전체 트랜지션을 fade로 바꿔줘
/slide-master-reveal:enhance 슬라이드 3에 강수 확률 pie 차트 넣어줘
/slide-master-reveal:enhance 슬라이드 1→2 사이에 auto-animate 적용해줘
/slide-master-reveal:enhance 슬라이드 2 배경을 그라데이션으로
/slide-master-reveal:enhance 모든 슬라이드에 발표자 노트 추가해줘
```

## 사용 가능한 기능

### Fragment (순차 표시)

클릭할 때마다 요소가 하나씩 나타납니다.

```html
<div class="card fragment">첫 번째</div>
<div class="card fragment fade-up">두 번째</div>
<p class="fragment highlight-red">강조</p>
```

| 애니메이션 | 효과 |
|-----------|------|
| `fade-in` | 페이드 인 (기본) |
| `fade-out` | 페이드 아웃 |
| `fade-up` / `fade-down` | 아래→위 / 위→아래 |
| `fade-left` / `fade-right` | 좌→우 / 우→좌 |
| `fade-in-then-out` | 나타났다 사라짐 |
| `fade-in-then-semi-out` | 나타났다 50% 투명 |
| `current-visible` | 현재 단계에서만 보임 |
| `semi-fade-out` | 50% 투명 |
| `grow` / `shrink` | 확대 / 축소 |
| `highlight-red` / `green` / `blue` | 색상 강조 |
| `highlight-current-red` / `green` / `blue` | 현재 단계만 색상 강조 |
| `strike` | 취소선 |

**패턴 예시:**
```html
<!-- 카드 순차 표시 -->
<div class="slide-grid-3">
  <div class="card fragment">First</div>
  <div class="card fragment">Second</div>
  <div class="card fragment">Third</div>
</div>
```

### Auto-Animate (슬라이드 간 전환)

`data-id`가 같은 요소가 자연스럽게 이동/변형됩니다.

```html
<section data-auto-animate>
  <h1 data-id="title">제목</h1>
</section>
<section data-auto-animate>
  <h1 data-id="title" style="font-size: 24pt;">제목</h1>
  <p>새 내용 등장</p>
</section>
```

옵션: `data-auto-animate-easing` (기본: ease), `data-auto-animate-duration` (기본: 1.0초)

### Transition (슬라이드 전환)

**전체 설정** (Reveal.initialize):
```javascript
transition: 'fade'  // none, fade, slide, convex, concave, zoom
```

**개별 슬라이드:**
```html
<section data-transition="fade">
<section data-transition="zoom">
<section data-transition="slide-in fade-out">
```

속도: `data-transition-speed="fast"` (default, fast, slow)

### Background (배경)

Slide Master 토큰 변수 사용:

```html
<section data-background-color="var(--slide-color-primary)">
<section data-background-gradient="linear-gradient(to bottom, var(--slide-color-primary), var(--slide-color-secondary))">
<section data-background-gradient="radial-gradient(var(--slide-color-primary), var(--slide-color-secondary))">
<section data-background-image="photo.jpg" data-background-opacity="0.3">
```

### Chart.js (차트)

**상세 레이아웃 패턴은 [charts.md](./charts.md) 참조.**

scaffold가 Chart.js와 RevealChart 플러그인을 template에 이미 포함합니다. `<head>`나 `Reveal.initialize()`를 수정할 필요 없습니다.

body 파일(`slides/slide-N-body.html`)에 아래 차트 패턴만 추가하세요:

**차트 패턴** (반드시 이 구조):
```html
<div style="flex: 1; position: relative; min-height: 0;">
  <canvas data-chart="pie">
  <!--
  {
    "data": {
      "labels": ["A", "B", "C"],
      "datasets": [{
        "data": [45, 35, 20],
        "backgroundColor": ["var(--slide-color-primary)", "var(--slide-color-secondary)", "var(--slide-color-text-muted)"]
      }]
    },
    "options": { "maintainAspectRatio": false }
  }
  -->
  </canvas>
</div>
```

차트 종류: `bar`, `line`, `pie`, `doughnut`, `radar`, `polarArea`, `bubble`, `scatter`

`?export` 쿼리를 붙이면 차트 애니메이션이 비활성화되어 PDF/스크린샷에 적합.

### Speaker Notes (발표자 노트)

```html
<aside class="notes">
  발표자만 보는 노트. 브라우저에서 S 키로 열기.
</aside>
```

### Code Highlighting (코드 하이라이트)

```html
<pre><code class="language-python" data-line-numbers="1|2-3|4">
import pandas as pd
df = pd.read_csv('data.csv')
result = df.groupby('category').sum()
print(result)
</code></pre>
```

정적 하이라이트 (step-through 없이): `data-line-numbers="3,5-7"`

### Slide Visibility

```html
<section data-visibility="hidden">    <!-- 네비게이션에서 숨김 -->
<section data-visibility="uncounted"> <!-- 번호 매기지 않음 -->
```

### Image / Media (이미지·미디어 효과)

fill로 배치된 이미지/미디어에 효과를 적용합니다.

**순차 겹침 (r-stack + fragment):**
```html
<div class="r-stack">
  <img class="fragment" src="step1.png" alt="Step 1">
  <img class="fragment" src="step2.png" alt="Step 2">
  <img class="fragment" src="step3.png" alt="Step 3">
</div>
```

**슬라이드 간 이미지 전환 (auto-animate):**
```html
<section data-auto-animate>
  <img data-id="diagram" src="overview.png" style="width: 300px;">
</section>
<section data-auto-animate>
  <img data-id="diagram" src="overview.png" style="width: 800px;">
</section>
```

**배경 이미지 + 오버레이 텍스트:**
```html
<section data-background-image="photo.jpg" data-background-opacity="0.3">
  <h1>제목</h1>
  <p>배경 위 텍스트</p>
</section>
```

**Before/After 비교:**
```html
<div class="r-stack">
  <img class="fragment current-visible" src="before.png" alt="Before">
  <img class="fragment" src="after.png" alt="After">
</div>
```

**테이블 행 순차 표시:**
```html
<table>
  <thead><tr><th>기능</th><th>값</th></tr></thead>
  <tbody>
    <tr class="fragment"><td>A</td><td>100</td></tr>
    <tr class="fragment"><td>B</td><td>200</td></tr>
    <tr class="fragment"><td>C</td><td>300</td></tr>
  </tbody>
</table>
```

**비디오 자동재생 (슬라이드 진입 시):**
```html
<video class="r-stretch" data-autoplay src="demo.mp4"></video>
```

**배경 비디오:**
```html
<section data-background-video="bg.mp4" data-background-video-loop data-background-video-muted>
```

### reveal.js 내장 클래스

```html
<h1 class="r-fit-text">자동 크기 맞춤</h1>
<img class="r-stretch" src="image.jpg">  <!-- 남은 공간 채우기 -->
<div class="r-stack">...</div>            <!-- 요소 겹치기 -->
```
