# Diagnostics & Debugging Plan

Purpose: ship lightweight, opt-in instrumentation so we can capture context during demos or reproductions without relying on UXCam yet.

## Pillars

1. **Debug Panel (in-app overlay)**
   - Trigger: triple-tap status bar or gesture from corner.
   - Contents: app version, environment, recent log events, toggles (show perf monitor, enable network logging, switch data source), quick links to Repro Lab screens.
   - Implementation: `react-native-reanimated` bottom sheet or simple modal with portal.

2. **Logging infrastructure**
   - Create `src/utils/logger.ts` exposing `logEvent({scope, message, payload})`.
   - Store last N events in memory + AsyncStorage for post-demo export.
   - Provide `useLogger` hook for screens to append context easily.

3. **Network inspector**
   - Wrap `fetch` globally or provide `useNetworkSandbox` hook with request/response interceptors.
   - Mirror data in Debug Panel + allow exporting to JSON via Share sheet.

4. **Performance helpers**
   - Add `usePerfTrace(label)` hook leveraging `performance.now()` + `InteractionManager` to measure phases.
   - Toggleable UI overlay showing FPS (via `react-native-performance-lens` or custom `PerformanceObserver`).

5. **Environment & feature flags**
   - Backed by `DemoStore`.
   - Flags: `useMockData`, `enableHermes`, `showPerfOverlay`, `logNavigation`.
   - Persist selections per device, with reset button inside Debug Panel.

## Implementation steps

1. Build `logger.ts` + tests; integrate with Debug Panel prototype.
2. Create `components/DebugPanel` with context provider for visibility, add gesture trigger via `react-native-gesture-handler`.
3. Instrument showcase screens to log key interactions (e.g., animation triggers, network calls).
4. Add network proxy/hook and surface history inside panel.
5. Update documentation (demo runbook + REPRO_LAB) to describe how to use diagnostics during customer sessions.

