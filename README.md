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
- `@kentra/ui-kit/forms`
- `@kentra/ui-kit/navigation`
- `@kentra/ui-kit/data-display`
- `@kentra/ui-kit/feedback`
- `@kentra/ui-kit/overlays`
- `@kentra/ui-kit/charts`

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

# Build only styles for @kentra/ui-kit
npm -w @kentra/ui-kit run build:styles

# Watch-mode build for local development
npm -w @kentra/ui-kit run dev

# Validate npm package content without publishing
npm -w @kentra/ui-kit run pack:dry

# Publish package manually (CI uses this on master with version guard)
npm -w @kentra/ui-kit run publish:ci
```

## Styles
Global styles import in consumer applications:

```scss
@import "@kentra/ui-kit/styles.css";
```

## Release
- Branch: `master`
- Versioning: manual in `lib/package.json`
- CI publish guard: publish only when version does not already exist in registry
