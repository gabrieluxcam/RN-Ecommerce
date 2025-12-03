import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export type DemoEnvironment = 'development' | 'demo' | 'production';

export interface DemoLogEvent {
  id: string;
  timestamp: number;
  scope: string;
  message: string;
  payload?: Record<string, unknown>;
}

export interface DemoNetworkSnapshot {
  id: string;
  url: string;
  method: string;
  status?: number;
  durationMs?: number;
  success: boolean;
  timestamp: number;
  requestBody?: unknown;
  responseBody?: unknown;
}

export interface DemoFeatureFlags {
  useMockData: boolean;
  showPerfOverlay: boolean;
  enableNetworkLogger: boolean;
  logNavigation: boolean;
}

export interface DemoState {
  environment: DemoEnvironment;
  featureFlags: DemoFeatureFlags;
  diagnostics: {
    events: DemoLogEvent[];
    networkHistory: DemoNetworkSnapshot[];
    maxEvents: number;
    maxNetworkEntries: number;
  };
  networkSandbox: {
    baseUrl: string;
    mockResponseEnabled: boolean;
  };
  reproNotes: string;
}

type DemoAction =
  | {type: 'SET_ENVIRONMENT'; payload: DemoEnvironment}
  | {type: 'TOGGLE_FLAG'; payload: keyof DemoFeatureFlags}
  | {type: 'SET_FLAG'; payload: {flag: keyof DemoFeatureFlags; value: boolean}}
  | {type: 'ADD_LOG_EVENT'; payload: DemoLogEvent}
  | {type: 'CLEAR_LOG_EVENTS'}
  | {type: 'ADD_NETWORK_SNAPSHOT'; payload: DemoNetworkSnapshot}
  | {type: 'CLEAR_NETWORK_HISTORY'}
  | {
      type: 'SET_NETWORK_SANDBOX';
      payload: Partial<DemoState['networkSandbox']>;
    }
  | {type: 'SET_REPRO_NOTES'; payload: string}
  | {type: 'RESET_STATE'};

const MAX_LOG_EVENTS = 200;
const MAX_NETWORK_ENTRIES = 100;

const initialState: DemoState = {
  environment: 'demo',
  featureFlags: {
    useMockData: true,
    showPerfOverlay: false,
    enableNetworkLogger: false,
    logNavigation: false,
  },
  diagnostics: {
    events: [],
    networkHistory: [],
    maxEvents: MAX_LOG_EVENTS,
    maxNetworkEntries: MAX_NETWORK_ENTRIES,
  },
  networkSandbox: {
    baseUrl: 'https://example.com/api',
    mockResponseEnabled: true,
  },
  reproNotes: '',
};

const DemoContext = createContext<
  | {
      state: DemoState;
      dispatch: React.Dispatch<DemoAction>;
    }
  | undefined
>(undefined);

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'SET_ENVIRONMENT':
      return {...state, environment: action.payload};
    case 'TOGGLE_FLAG': {
      const flag = action.payload;
      return {
        ...state,
        featureFlags: {
          ...state.featureFlags,
          [flag]: !state.featureFlags[flag],
        },
      };
    }
    case 'SET_FLAG':
      return {
        ...state,
        featureFlags: {
          ...state.featureFlags,
          [action.payload.flag]: action.payload.value,
        },
      };
    case 'ADD_LOG_EVENT': {
      const nextEvents = [
        action.payload,
        ...state.diagnostics.events,
      ].slice(0, state.diagnostics.maxEvents);
      return {
        ...state,
        diagnostics: {
          ...state.diagnostics,
          events: nextEvents,
        },
      };
    }
    case 'CLEAR_LOG_EVENTS':
      return {
        ...state,
        diagnostics: {
          ...state.diagnostics,
          events: [],
        },
      };
    case 'ADD_NETWORK_SNAPSHOT': {
      const nextHistory = [
        action.payload,
        ...state.diagnostics.networkHistory,
      ].slice(0, state.diagnostics.maxNetworkEntries);
      return {
        ...state,
        diagnostics: {
          ...state.diagnostics,
          networkHistory: nextHistory,
        },
      };
    }
    case 'CLEAR_NETWORK_HISTORY':
      return {
        ...state,
        diagnostics: {
          ...state.diagnostics,
          networkHistory: [],
        },
      };
    case 'SET_NETWORK_SANDBOX':
      return {
        ...state,
        networkSandbox: {
          ...state.networkSandbox,
          ...action.payload,
        },
      };
    case 'SET_REPRO_NOTES':
      return {
        ...state,
        reproNotes: action.payload,
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

export const DemoProvider = ({children}: PropsWithChildren): JSX.Element => {
  const [state, dispatch] = useReducer(demoReducer, initialState);
  const value = useMemo(() => ({state, dispatch}), [state]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

function useDemoContext() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoContext must be used within a DemoProvider');
  }
  return context;
}

export function useDemoState<T>(selector: (state: DemoState) => T): T {
  const {state} = useDemoContext();
  return selector(state);
}

export function useDemoActions() {
  const {dispatch} = useDemoContext();
  return {
    setEnvironment: (env: DemoEnvironment) =>
      dispatch({type: 'SET_ENVIRONMENT', payload: env}),
    toggleFlag: (flag: keyof DemoFeatureFlags) =>
      dispatch({type: 'TOGGLE_FLAG', payload: flag}),
    setFlag: (flag: keyof DemoFeatureFlags, value: boolean) =>
      dispatch({type: 'SET_FLAG', payload: {flag, value}}),
    logEvent: (event: Omit<DemoLogEvent, 'id' | 'timestamp'>) => {
      dispatch({
        type: 'ADD_LOG_EVENT',
        payload: {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          timestamp: Date.now(),
          ...event,
        },
      });
    },
    clearLogEvents: () => dispatch({type: 'CLEAR_LOG_EVENTS'}),
    recordNetworkSnapshot: (snapshot: Omit<DemoNetworkSnapshot, 'id'>) => {
      dispatch({
        type: 'ADD_NETWORK_SNAPSHOT',
        payload: {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          ...snapshot,
        },
      });
    },
    clearNetworkHistory: () => dispatch({type: 'CLEAR_NETWORK_HISTORY'}),
    setNetworkSandbox: (
      sandbox: Partial<DemoState['networkSandbox']>,
    ) => dispatch({type: 'SET_NETWORK_SANDBOX', payload: sandbox}),
    setReproNotes: (notes: string) =>
      dispatch({type: 'SET_REPRO_NOTES', payload: notes}),
    resetDemoState: () => dispatch({type: 'RESET_STATE'}),
  };
}

export function useDemoLogger(scope: string) {
  const {logEvent} = useDemoActions();
  return {
    log: (message: string, payload?: Record<string, unknown>) =>
      logEvent({scope, message, payload}),
  };
}

export function useNetworkLogger() {
  const {recordNetworkSnapshot} = useDemoActions();
  return {
    record: (snapshot: Omit<DemoNetworkSnapshot, 'id'>) =>
      recordNetworkSnapshot(snapshot),
  };
}

