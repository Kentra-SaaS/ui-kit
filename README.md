# Kentra UI Kit

## Purpose
This repository is the shared UI Kit monorepo for Kentra interfaces.
It provides reusable UI foundations across Product UI and Web-App surfaces.
The monorepo standardizes tokens, components, charts, and framework adapters.
Design and implementation choices target consistency and reuse.
Accessibility, theming, and distribution rules are defined in source docs.

## System Role
The UI Kit is a cross-system dependency for Product-Core UI and Web-App.
It does not own product-domain logic, licensing, or backend decisions.
It defines reusable presentation building blocks and packaging workflows.
Framework-specific packages expose the same design primitives.
Changes should preserve compatibility expectations across consuming apps.
Core patterns should stay aligned with architecture and governance references.

## Quick Start
Install all workspace dependencies:
```bash
npm install
```
Build all workspaces:
```bash
npm run build
```
Run workspace tests:
```bash
npm run test
```
Run workspace lint checks:
```bash
npm run lint
```
Start docs app:
```bash
npm run dev:docs
```

## Repository Layout
- `package.json`: root workspace definition and script entrypoint.
- `tsconfig.base.json`: shared TypeScript baseline across workspaces.
- `packages/tokens`: design token package.
- `packages/core`: framework-agnostic core UI package.
- `packages/charts`: chart wrappers and data-visualization components.
- `packages/astro`: Astro integration package.
- `packages/angular`: Angular integration package.
- `apps/docs`: documentation application for UI Kit usage.
- `apps/playground-angular`: Angular playground for component validation.
- `apps/playground-astro`: Astro playground for component validation.

## Related Documentation
- UI Kit architecture hub:
  `../docs/engineering/architektur/ui-kit/README.md`
- UI Kit concept and principles:
  `../docs/engineering/architektur/ui-kit/konzept-und-prinzipien.md`
- Component model and boundaries:
  `../docs/engineering/architektur/ui-kit/komponentenmodell-und-grenzen.md`
- Distribution and versioning:
  `../docs/engineering/architektur/ui-kit/distribution-und-versionierung.md`
- Canonical system architecture:
  `../docs/engineering/architektur/system-architecture-canonical.md`
- Frontend theming integration:
  `../docs/engineering/architektur/frontend/theming-and-ui-kit.md`
