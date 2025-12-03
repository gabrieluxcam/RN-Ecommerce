# Demo Readiness Plan

This document tracks the work required to turn the RN Ecommerce demo into a dependable sandbox for showcasing React Native capabilities and reproducing customer issues before UXCam is reintroduced.

## Objectives

1. Provide a polished, stable commerce baseline (splash → browse → detail → cart → account).
2. Curate a menu of React Native feature demos that mirror common customer conversations.
3. Maintain pre-wired blank workspaces for rapid issue reproduction.
4. Bake in lightweight diagnostics (logging, toggles, perf helpers) ahead of UXCam.
5. Document repeatable build + demo procedures so any teammate can run the app confidently.

## Current State Snapshot

### Commerce flows

| Flow | Entry Point | Status | Notes |
| --- | --- | --- | --- |
| Splash → Home tabs | `HomeNavigator` (Stack + BottomTabs) | ✅ | Splash screen is wired; home tabs expose Home, Category, Brand, Account, MyBag. |
| Product discovery | `screens/Home`, `screens/ProductList`, `screens/Detail` | ✅ (static data) | Uses dummy data from `src/data`. No pagination or filter controls yet. |
| Cart & checkout | `screens/Cart` | ⚠️ basic | Shows items & promo code field, but no payment step or success flow. |
| Account & profile | `screens/Account` | ⚠️ partial | Includes profile UI + placeholder actions, but no persistence/API hooks. |
| Address & Login | `screens/Forms/*`, `AddressNavigator`, `LoginNavigator` | ⚠️ | Forms are mostly UI demos; validation/networking is stubbed. |

### Feature showcase screens (`screens/Showcase`)

- Animations, Gestures, Forms, Lists & Virtualized performance, Charts, Networking, Storage, Maps, Camera, Native Modules.
- Each screen is self-contained but lacks shared scaffolding (common header, logging helpers, scenario toggles).

### Blank repro surfaces

- `TestPage1` & `TestPage2` exist but are generic placeholders; no guidance, state reset helpers, or sample wiring to native modules.

### Tooling & instrumentation

- LogBox is globally disabled in `App.tsx`.
- No feature flagging, environment switcher, or debug overlay.
- Android build currently requires manual Java 17 install; iOS builds succeed after `AppDelegate` fix.

## Gaps & Opportunities

1. **Demo narrative** – need a scripted path covering commerce + showcase screens with success criteria.
2. **State management clarity** – `ClothesProvider` is the only context; forms/networking demos rely on local component state.
3. **Testing templates** – blank screens should include notes, toggles, and sample hooks for quickly dropping in customer snippets.
4. **Native integrations** – camera/maps demos stop at UI; no sample permissions, file uploads, or location mocks.
5. **Diagnostics** – no in-app logger, network inspector hook, or easy way to toggle mock data vs live API.
6. **Documentation** – build instructions, smoke-test checklist, and demo playbook are missing.

## Proposed Backlog (phaseable)

| Bucket | Tasks |
| --- | --- |
| **Commerce polish** | Add simple checkout confirmation screen, hook cart to sample payment intent mock, wire account form to local storage, ensure splash/home transitions skip in dev mode. |
| **Showcase upgrades** | Add consistent top banner with context + “how to demo” tips, include instrumentation toggles (log actions, show RN perf monitor), add platform-specific notes (e.g., Hermes vs JSC). |
| **Repro Lab** | Convert `TestPage1/2` into a “Repro Lab” navigator with multiple templates: blank hook sandbox, native module bridge template, network repro template (fetch + logger), layout stress test template. |
| **Diagnostics & toggles** | Implement a global debug panel (gesture to open) exposing feature flags, network logger opt-in, async-storage viewer, screen perf metrics. |
| **Build & docs** | Write `docs/demo-runbook.md` covering setup (Java 17, pods), smoke tests, and demo script; add npm scripts for `yarn demo:ios` / `yarn demo:android` (clean + run). |
| **Sample data & mocks** | Provide a mock server or static JSON for networking demo with success/error toggles; add fixture loader for cart/account flows to reset quickly between demos. |

## Pre-UXCam Instrumentation Hooks

- Event bus / logger utility exporting to console + optional file.
- Screen-level `useDemoTracker` hook to register start/end timestamps.
- Simple `DebugToast` component to surface important events without UXCam.
- Network interceptor (e.g., using `axios` interceptors or `fetch` proxy) to log payloads.

## Demo Runbook Skeleton

1. **Setup** – ensure Java 17, install pods, run `yarn ios` / `yarn android`.
2. **Smoke test checklist** – splash → home tabs, open drawer, run each showcase screen, verify Repro Lab templates render.
3. **Demo script** – Commerce journey, highlight RN features (animations, gestures, maps, camera), jump into Repro Lab to show how we can drop in customer code.
4. **Post-demo reset** – clear AsyncStorage, reset mock data, capture logs if reproducing a bug.

## Next Steps

1. Finalize detailed requirements per backlog bucket (owners, acceptance criteria).
2. Stand up `docs/demo-runbook.md` and seed with build instructions + smoke tests.
3. Tackle Repro Lab templates first (highest leverage for customer issues).
4. Layer instrumentation helpers, then proceed to polish commerce + showcase screens.

