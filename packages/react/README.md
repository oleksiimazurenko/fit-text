# @oleksiimazurenko/react-fit-text

Fit text to its container with **pure CSS** — zero runtime JavaScript.

Everyone reaches for a JavaScript hook (`fitty`, `textFit`, `react-textfit`, a
homemade `useFitText`) that measures the text and shrinks the font until it
fits. That measure-then-resize loop runs after mount, causes layout shift, and
ships JS for what is fundamentally a layout concern.

This does it with container-query units + `clamp()` instead: the font scales to
its container's width, clamped between a mobile floor and a desktop ceiling, and
long words break and hyphenate by the document's language so nothing overflows.
No hooks, no measuring, no layout shift, correct on first paint — and it works
during SSR before hydration.

## Install

```sh
npm install @oleksiimazurenko/react-fit-text
```

The stylesheet core (`@oleksiimazurenko/fit-text`) is installed automatically as
a dependency — you import the component from this package and the CSS from it.

## Usage

```tsx
import { FitText } from '@oleksiimazurenko/react-fit-text'
import '@oleksiimazurenko/fit-text/style.css'

export function Hero() {
  return (
    <FitText min="2rem" max={72} slope={10}>
      Learn anything, beautifully
    </FitText>
  )
}
```

The font is now fluid with the container: it grows with the container's width
(`slope`% of it), never smaller than `min`, never larger than `max`.

### Props

| Prop        | Type               | Default  | Description                                                        |
| ----------- | ------------------ | -------- | ------------------------------------------------------------------ |
| `min`       | `number \| string` | `2rem`   | Mobile floor. Number → `px`, string used as-is.                    |
| `max`       | `number \| string` | `4.5rem` | Desktop ceiling. Number → `px`, string used as-is.                 |
| `slope`     | `number`           | `10`     | Fluid slope — font grows this % of the container's width (`cqi`).  |
| `as`        | `ElementType`      | `"div"`  | Container element/tag (e.g. `"h1"`, `"h2"`).                       |
| `className` | `string`           | —        | Added alongside the `fit-text` class on the container.             |
| `style`     | `CSSProperties`    | —        | Merged onto the container.                                         |
| `children`  | `ReactNode`        | —        | The text.                                                          |

## How it works

```css
.fit-text {
  container-type: inline-size; /* the query container */
}

.fit-text__inner {
  font-size: clamp(
    var(--fit-text-min, 2rem),
    calc(var(--fit-text-slope, 10) * 1cqi), /* % of container width */
    var(--fit-text-max, 4.5rem)
  );
  text-wrap: balance;
  hyphens: auto;              /* language-aware, from the document's lang */
  overflow-wrap: break-word;  /* last-resort break so nothing overflows */
}
```

The component renders a container element plus an inner `<span>`. The span reads
`cqi` from the container (an element can't size its own font from its own
container, hence the two-element split) and applies your `min`/`max`/`slope`
through CSS custom properties.

### CSS only, no React

You don't need the component — use the framework-agnostic core package
[`@oleksiimazurenko/fit-text`](https://www.npmjs.com/package/@oleksiimazurenko/fit-text)
directly. Apply the classes yourself and set the custom properties:

```html
<link rel="stylesheet" href="@oleksiimazurenko/fit-text/style.css" />

<h2 class="fit-text" style="--fit-text-min: 2rem; --fit-text-max: 72px; --fit-text-slope: 10">
  <span class="fit-text__inner">Learn anything, beautifully</span>
</h2>
```

## The one gotcha: the cascade

If the font seems stuck at its `max` in every container (looking like a viewport
fallback), it's almost never container queries — it's the cascade. A broader
rule from your design system, e.g. `.title p, .title span { font-size: … }`
(specificity `(0,1,1)`), can outrank a single-class rule and silently pin the
size, overriding the `clamp()`.

This package sidesteps the most common case by putting the sizing on an inner
element with its own class (`.fit-text__inner`), so `<tag> p`-style rules don't
hit it. If you still see it ignored, inspect the element and check which rule
actually sets `font-size`, then raise your selector's specificity (e.g. nest it:
`.fit-text .fit-text__inner`).

## Hyphenation is language-aware

`hyphens: auto` uses the hyphenation dictionary for the element's language,
read from the `lang` attribute. If your document sets `<html lang="…">` per
locale (as most i18n setups do), you get correct hyphens in every language for
free — German pages hyphenate with the German dictionary, English with English.

## Browser support

Container-query length units (`cqi`) are supported in all current evergreen
browsers, and have been since 2023. `clamp()`, `overflow-wrap`, `hyphens`, and
`text-wrap: balance` are widely available too (`text-wrap: balance` is the
newest and degrades gracefully to normal wrapping where absent).

## License

MIT © Oleksii Mazurenko
