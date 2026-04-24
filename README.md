# Kentra UI Kit

## Purpose
This repository contains a single publishable Angular UI Kit package.
The package bundles root styles and infrastructure for categorized component entry points.

## Package
- Publishable package: `@kentra/ui-kit`
- Registry: GitHub Packages (`@kentra` scope)

## Public Imports
- `@kentra/ui-kit`
- `@kentra/ui-kit/styles.css`
- `@kentra/ui-kit/layout`
- `@kentra/ui-kit/typography`
- `@kentra/ui-kit/actions`
- `@kentra/ui-kit/icons`
- `@kentra/ui-kit/forms`
- `@kentra/ui-kit/navigation`
- `@kentra/ui-kit/patterns`
- `@kentra/ui-kit/data-display`
- `@kentra/ui-kit/feedback`
- `@kentra/ui-kit/overlays`
- `@kentra/ui-kit/charts`

## Layer and Consumption Rules (KIT-014)
- Allowed consumer imports are limited to the public entrypoints listed above.
- No deep imports from `@kentra/ui-kit/internal`.
- No local imports from `../internal` in consumer apps.
- Domain modules compose UI from public primitives/patterns and never from UI-Kit internals.

## Internal (not public)
- `tokens`
- `core`
- `charts` foundation internals

## Quick Start
```bash
npm install
npm run build
```

## Important Commands
```bash
# Install dependencies
npm install

# Build root styles (SCSS -> CSS) and library dist
npm run build

# Build only styles
npm run build:styles

# Watch-mode build for local development
npm run dev

# Validate npm package content without publishing
npm run pack:dry

# Publish package manually (CI uses this on master with version guard)
npm run publish
```

## Styles
Global styles import in consumer applications:

```scss
@import "@kentra/ui-kit/styles.css";
```

## Release
- Branch: `master`
- Versioning: manual in `package.json`
- CI publish guard: publish only when version does not already exist in registry

## M1 Compliance (KIT-012)
- Component scope and contracts are anchored in:
  - `internal/components/**/**/*.contract.ts`
  - Public entrypoints: `layout`, `typography`, `actions`, `icons`, `forms`, `navigation`, `patterns`, `data-display`, `feedback`, `overlays`, `charts`
- Theme baseline is enforced through:
  - `tests/theme-quality-gates.spec.ts`
- Accessibility baseline is enforced through:
  - `tests/accessibility-quality-gates.spec.ts`
- Release baseline is enforced through:
  - `tests/release-quality-gates.spec.ts`
  - `.github/workflows/release-ui-kit.yml` (`test`, `test:typecheck`, `build`, `pack:dry` before publish)

Reproducible local verification:

```bash
npx vitest run tests/accessibility-quality-gates.spec.ts tests/theme-quality-gates.spec.ts tests/release-quality-gates.spec.ts
npm run test:typecheck
npm run build
```

## M1.1 Compliance (KIT-014)
- Layer and public-consumption guardrails are enforced through:
  - `tests/layer-consumption-quality-gates.spec.ts`

Reproducible local verification:

```bash
npx vitest run tests/layer-consumption-quality-gates.spec.ts
npm run test:typecheck
npm run build
```

## M1.2 Compliance (KIT-015)
- SCSS foundation and theme-switching guardrails are enforced through:
  - `tests/scss-foundation-quality-gates.spec.ts`
  - `tests/theme-quality-gates.spec.ts`
  - `tests/tokens-css-coverage.spec.ts`

Reproducible local verification:

```bash
npx vitest run tests/scss-foundation-quality-gates.spec.ts tests/theme-quality-gates.spec.ts tests/tokens-css-coverage.spec.ts
npm run test:typecheck
npm run build
```
