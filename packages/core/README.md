# @oleksiimazurenko/fit-text

Fit text to its container with **pure CSS** — zero JavaScript. The
framework-agnostic stylesheet core of the [fit-text](https://github.com/oleksiimazurenko/fit-text)
family.

The font scales to its container's width (container-query `cqi` units), clamped
between a mobile floor and a desktop ceiling, and long words break and hyphenate
by the document's language so nothing overflows. No hooks, no measuring, no
layout shift, correct on first paint, works during SSR before hydration.

> Using React? Prefer [`@oleksiimazurenko/react-fit-text`](https://www.npmjs.com/package/@oleksiimazurenko/react-fit-text),
> which wraps this stylesheet in a `<FitText>` component.

## Install

```sh
npm install @oleksiimazurenko/fit-text
```

## Usage

Import the stylesheet once, then use the two-element structure: an outer element
that is the query container, and an inner element that reads `cqi` from it.

```html
<link rel="stylesheet" href="@oleksiimazurenko/fit-text/style.css" />

<h2 class="fit-text" style="--fit-text-min: 2rem; --fit-text-max: 72px; --fit-text-slope: 10">
  <span class="fit-text__inner">Learn anything, beautifully</span>
</h2>
```

### Custom properties

| Property             | Default  | Description                                                       |
| -------------------- | -------- | ----------------------------------------------------------------- |
| `--fit-text-min`     | `2rem`   | Mobile floor — the font never goes below this.                    |
| `--fit-text-max`     | `4.5rem` | Desktop ceiling — the font never goes above this.                 |
| `--fit-text-slope`   | `10`     | Fluid slope — the font grows this % of the container's width.     |

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

An element can't size its own font from its own container, so the sizing lives
on the inner element. That inner class also out-specifies most design-system
`.title p`-style rules, which would otherwise silently override the `clamp()`.

## Hyphenation is language-aware

`hyphens: auto` uses the hyphenation dictionary for the element's language, read
from the `lang` attribute. If your document sets `<html lang="…">` per locale,
you get correct hyphens in every language for free.

## Browser support

Container-query length units (`cqi`) are supported in all current evergreen
browsers, and have been since 2023. `clamp()`, `overflow-wrap`, `hyphens`, and
`text-wrap: balance` are widely available too.

## License

MIT © Oleksii Mazurenko
