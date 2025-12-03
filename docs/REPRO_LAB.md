# Repro Lab Templates

Goal: provide a curated set of blank-yet-opinionated spaces for quickly reproducing customer issues without touching core commerce code.

## Navigator structure

```
ReproLabNavigator (Stack)
 ├─ ReproLabHome (index + guidance)
 ├─ BlankCanvasScreen
 ├─ NetworkSandboxScreen
 ├─ NativeBridgeSandboxScreen
 ├─ LayoutStressScreen
 └─ PerformanceBenchScreen
```

- Register `ReproLabNavigator` inside the drawer under “Repro Lab”.
- Each screen ships with helper components (reset buttons, status chips, logging hooks).

## Screen templates

| Screen | Purpose | Pre-wired helpers |
| --- | --- | --- |
| BlankCanvas | Minimal SafeArea + ScrollView + styles + sample hook imports. Includes instructions block + “Reset screen” button that clears local state/context. |
| NetworkSandbox | Uses a shared `useNetworkSandbox` hook (wraps `fetch`/`axios`), supports success/error toggles, request history panel, and easy payload injection. |
| NativeBridge | Provides a template module interface (placeholder TS definitions + mock native module), instructions for adding platform-specific code, and runtime guard if the module isn’t linked. |
| LayoutStress | Contains grid/list toggle, ability to dynamically add boxes/text to simulate heavy layout, and FPS/perf metrics toggles. |
| PerformanceBench | Hooks into `InteractionManager` + `useEffect` timers, capturing durations and rendering them in a chart/list for quick comparison. |

## Shared utilities

- `hooks/useReproNotes` – stores notes + reproduction steps (persists to AsyncStorage).
- `components/DemoSection` – consistent card styling for callouts, code snippets, and toggles.
- `components/ActionToolbar` – includes buttons for “Clear”, “Log State”, “Show Debug Panel”.

## Implementation checklist

1. Create `navigations/ReproLabNavigator.tsx` with stack + drawer entry.
2. Add shared components/hooks under `src/reproLab/`.
3. Convert `TestPage1`/`TestPage2` into the new templates or re-export them while keeping routes stable.
4. Update drawer labels + documentation so demo operators know how to use each template.
5. Add unit snapshot tests for shared components (where practical) to ensure layout regressions are caught.

## Best practices

- Keep screens TypeScript-first with strict props.
- Avoid hard-coded customer data; rely on dummy objects to illustrate structure.
- Make reset/logging buttons accessible (VoiceOver labels, testIDs).
- Document each screen’s usage inside the component file header so future contributors can ramp quickly.

