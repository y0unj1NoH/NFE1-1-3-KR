import type { ReactNode, Dispatch } from 'react';
import { createContext, useContext, useReducer } from 'react';

type State = {
  backgroundColor: string;
};

type Action = {
  type: 'SET_BACKGROUND_COLOR';
  payload: string;
};

const BackgroundColorStateContext = createContext<State | undefined>(undefined);
const BackgroundColorDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

const backgroundColorReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_BACKGROUND_COLOR':
      return { ...state, backgroundColor: action.payload };
    default:
      throw new Error(`Unhandled background action type`);
  }
};

export const BackgroundColorProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(backgroundColorReducer, { backgroundColor: 'bg-primary' });

  return (
    <BackgroundColorStateContext.Provider value={state}>
      <BackgroundColorDispatchContext.Provider value={dispatch}>
        {children}
      </BackgroundColorDispatchContext.Provider>
    </BackgroundColorStateContext.Provider>
  );
};

export const useBackgroundColorState = () => {
  const context = useContext(BackgroundColorStateContext);
  if (context === undefined) {
    throw new Error('BackgroundColorState Error');
  }
  return context;
};

export const useBackgroundColorDispatch = () => {
  const context = useContext(BackgroundColorDispatchContext);
  if (context === undefined) {
    throw new Error('BackgroundColorDispatch Error');
  }
  return context;
};

export const setBackgroundColor = (dispatch: Dispatch<Action>, color: string) => {
  dispatch({ type: 'SET_BACKGROUND_COLOR', payload: color });
};
