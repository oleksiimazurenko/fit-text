# fit-text

Fit text to its container with **pure CSS** — zero runtime JavaScript.

Everyone reaches for a JavaScript hook (`fitty`, `textFit`, `react-textfit`, a
homemade `useFitText`) that measures the text and shrinks the font until it
fits. That measure-then-resize loop runs after mount, causes layout shift, and
ships JS for what is fundamentally a layout concern.

fit-text does it with container-query units + `clamp()` instead: the font scales
to its container's width, clamped between a mobile floor and a desktop ceiling,
and long words break and hyphenate by the document's language so nothing
overflows. No hooks, no measuring, no layout shift, correct on first paint —
and it works during SSR before hydration.

## Packages

| Package | Description |
| ------- | ----------- |
| [`@oleksiimazurenko/fit-text`](packages/core) | Framework-agnostic stylesheet core. Pure CSS, no JS. |
| [`@oleksiimazurenko/react-fit-text`](packages/react) | React `<FitText>` component over the core. |

Solid and Svelte wrappers may follow, sharing the same core.

## Quick start (React)

```sh
npm install @oleksiimazurenko/react-fit-text
```

```tsx
import { FitText } from '@oleksiimazurenko/react-fit-text'
import '@oleksiimazurenko/fit-text/style.css'

// No props needed — scales to its container with sensible defaults.
<FitText>Learn anything, beautifully</FitText>

// Optional tuning when the defaults don't fit your design:
<FitText min="2rem" max={72} slope={10}>Learn anything, beautifully</FitText>
```

## Develop

```sh
pnpm install
pnpm build        # turbo run build across packages
pnpm typecheck
```

Releases are managed with [changesets](https://github.com/changesets/changesets):
`pnpm changeset` to record a change; merging to `main` opens a "Version Packages"
PR, and merging that publishes to npm with provenance via GitHub OIDC.

## License

MIT © Oleksii Mazurenko
