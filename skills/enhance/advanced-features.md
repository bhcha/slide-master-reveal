# Advanced Features

These features are available when the user specifically requests them.

## Fragments (Progressive Reveal)

Show content step-by-step on click:

```html
<p class="fragment">Appears on click</p>
<p class="fragment fade-up">Slides up</p>
<p class="fragment highlight-red">Turns red</p>
```

Fragment animations:
- `fade-in` (default), `fade-out`
- `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `highlight-red`, `highlight-green`, `highlight-blue`
- `strike` (strikethrough)

## Auto-Animate

Automatically animate elements between slides. Elements with matching `data-id` will transition smoothly:

```html
<section data-auto-animate>
  <h1 data-id="title">Title</h1>
</section>
<section data-auto-animate>
  <h1 data-id="title">Title</h1>
  <h2>Subtitle appears with animation</h2>
</section>
```

## Speaker Notes

The `narration` field from the export is automatically placed as speaker notes:

```html
<aside class="notes">
  Narration text from the slide data
</aside>
```

Press `S` in the browser to open speaker view.

## Backgrounds

### Solid Color
```html
<section data-background-color="var(--slide-color-primary)">
```

### Gradient
```html
<section data-background-gradient="linear-gradient(to bottom, var(--slide-color-primary), var(--slide-color-secondary))">
```

### Image
```html
<section data-background-image="image.jpg" data-background-opacity="0.5">
```

## Transitions

Per-slide transitions:
```html
<section data-transition="fade">
<section data-transition="slide">
<section data-transition="zoom">
<section data-transition="slide-in fade-out">
```

## Code Highlighting

```html
<pre><code class="language-javascript" data-line-numbers="1-2|3|4">
let a = 1;
let b = 2;
let c = a + b;
console.log(c);
</code></pre>
```

Use `--slide-color-overlay` for code block background and `--slide-color-on-overlay` for text — these are already set in the exported CSS.
