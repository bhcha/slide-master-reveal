# Chart.js Integration

Add charts using the reveal.js Chart.js plugin. Charts use `--slide-*` color variables.

## Setup

Add to `index.html` before `Reveal.initialize()`:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chart/plugin.js"></script>
```

Add to `Reveal.initialize()`:
```javascript
plugins: [ RevealChart ],
chart: {
  defaults: {
    color: 'var(--slide-color-text-muted)',
    borderColor: 'var(--slide-color-border)'
  }
}
```

## Chart Layout Pattern

Every chart needs this structure to prevent overflow:

```html
<div style="flex: 1; position: relative; min-height: 0;">
  <canvas data-chart="bar">
  <!--
  {
    "data": {
      "labels": ["Q1", "Q2", "Q3", "Q4"],
      "datasets": [{
        "label": "Revenue",
        "data": [45, 52, 61, 78],
        "backgroundColor": "var(--slide-color-primary)"
      }]
    },
    "options": { "maintainAspectRatio": false }
  }
  -->
  </canvas>
</div>
```

## Using Slide Master Colors

Reference our CSS variables in chart colors:

```json
"backgroundColor": ["var(--slide-color-primary)", "var(--slide-color-secondary)", "var(--slide-color-text-muted)"]
```

## Chart Types

Supported: `bar`, `line`, `pie`, `doughnut`, `radar`, `polarArea`, `scatter`

## Layout Examples

### Full Slide
```html
<div class="slide-body" style="display: flex; flex-direction: column;">
  <h2>Chart Title</h2>
  <div style="flex: 1; position: relative; min-height: 0;">
    <canvas data-chart="bar"><!-- data --></canvas>
  </div>
</div>
```

### Side by Side (using slide-grid-2)
```html
<div class="slide-body">
  <h2>Comparison</h2>
  <div class="slide-grid-2" style="flex: 1; min-height: 0;">
    <div style="position: relative; min-height: 0;">
      <canvas data-chart="pie"><!-- data --></canvas>
    </div>
    <div>
      <p>Analysis text</p>
    </div>
  </div>
</div>
```
