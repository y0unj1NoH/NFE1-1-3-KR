import type React from 'react';
import { createContext, useContext, useReducer, type ReactNode } from 'react';

type ModalState = {
  isOpen: boolean;
};

type ModalAction = { type: 'OPEN_MODAL' } | { type: 'CLOSE_MODAL' };

const initialState: ModalState = {
  isOpen: false,
};

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

const ModalStateContext = createContext<ModalState | undefined>(undefined);
const ModalDispatchContext = createContext<React.Dispatch<ModalAction> | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export const useModalState = () => {
  const context = useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error('ModalState Error');
  }
  return context;
};

export const useModalDispatch = () => {
  const context = useContext(ModalDispatchContext);
  if (context === undefined) {
    throw new Error('ModalDispatch Error');
  }
  return context;
};
