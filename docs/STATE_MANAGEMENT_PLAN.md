# State Management Clarity

Objective: document and modernize how state flows through the demo app so reproducing issues or adding features stays predictable.

## Current picture

- Global context: `ClothesProvider` (products, favorites, cart).
- Local component state dominates forms, showcase demos, and repro pages.
- No central store for demo toggles, diagnostics, or feature flags.

## Target architecture

1. **DemoStore (Context + Reducer or Zustand)**  
   - Lives in `src/state/demoStore.ts`.  
   - Holds: environment (dev/demo/prod), feature toggles, last run scenario, debug flags, network sandbox config.
   - Exposed via `DemoProvider` wrapping `ClothesProvider` in `App.tsx`.

2. **Domain slices**  
   - `CommerceSlice` remains in `ClothesProvider` (can later migrate).  
   - `FormsSlice` manages login/address form data + validation errors.  
   - `DiagnosticsSlice` tracks logs, perf metrics, network history.

3. **Hooks API**  
   - `useDemoState(selector)` – typed selector hook with shallow compare.  
   - `useDemoActions()` – returns bound dispatchers (toggleFlag, setEnvironment, pushLogEntry, resetSandbox).  
   - `usePersistedForm(key)` – stores form drafts in AsyncStorage for quick repro resets.

4. **Best practices**  
   - Keep reducers pure; side effects live in hooks/thunks.  
   - Provide TypeScript enums/constants for action types to avoid stringly typed dispatch.  
   - Memoize expensive selectors with `useMemo` or library support.  
   - Co-locate state tests under `src/state/__tests__`.

## Rollout steps

1. Scaffold `DemoProvider` + base reducer with example flag.  
2. Wire provider tree in `App.tsx` (ClothesProvider → DemoProvider or vice versa depending on dependencies).  
3. Migrate existing demo toggles (e.g., `LogBox.ignoreAllLogs`) into the store.  
4. Update showcase screens to consume shared state/hooks where relevant (e.g., networking demo uses `useDemoState` to display environment).  
5. Add documentation to `docs/demo-runbook.md` on how to adjust flags during demos.

