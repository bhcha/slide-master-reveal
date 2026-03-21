---
description: 차트, 프래그먼트, 트랜지션, 배경, auto-animate 등 고급 기능 적용
---

# Enhance

reveal.js 고급 기능을 프레젠테이션에 적용합니다.

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
| `fade-up` / `fade-down` | 아래→위 / 위→아래 |
| `fade-left` / `fade-right` | 좌→우 / 우→좌 |
| `highlight-red` / `green` / `blue` | 색상 강조 |
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

### Background (배경)

Slide Master 토큰 변수 사용:

```html
<section data-background-color="var(--slide-color-primary)">
<section data-background-gradient="linear-gradient(to bottom, var(--slide-color-primary), var(--slide-color-secondary))">
<section data-background-image="photo.jpg" data-background-opacity="0.3">
```

### Chart.js (차트)

차트 추가 시 먼저 `index.html`의 `<head>`에 스크립트 추가:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chart/plugin.js"></script>
```

`Reveal.initialize()`에 플러그인 등록:
```javascript
plugins: [ RevealChart ],
chart: { defaults: { color: 'var(--slide-color-text-muted)', borderColor: 'var(--slide-color-border)' } }
```

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

차트 종류: `bar`, `line`, `pie`, `doughnut`, `radar`, `scatter`

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
