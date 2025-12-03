import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import DebugPanel from './DebugPanel';
import FloatingDebugButton from './FloatingDebugButton';

type DebugPanelContextValue = {
  openPanel: () => void;
  closePanel: () => void;
};

const DebugPanelContext = createContext<DebugPanelContextValue | undefined>(
  undefined,
);

export const DebugPanelProvider = ({children}: PropsWithChildren) => {
  const [visible, setVisible] = useState(false);

  const openPanel = useCallback(() => setVisible(true), []);
  const closePanel = useCallback(() => setVisible(false), []);

  const value = useMemo(
    () => ({
      openPanel,
      closePanel,
    }),
    [openPanel, closePanel],
  );

  return (
    <DebugPanelContext.Provider value={value}>
      {children}
      <DebugPanel visible={visible} onClose={closePanel} />
      <FloatingDebugButton onPress={openPanel} />
    </DebugPanelContext.Provider>
  );
};

export const useDebugPanel = () => {
  const context = useContext(DebugPanelContext);
  if (!context) {
    throw new Error('useDebugPanel must be used within DebugPanelProvider');
  }
  return context;
};

