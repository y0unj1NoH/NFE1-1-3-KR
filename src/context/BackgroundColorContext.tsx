import { createContext, useContext, useState, type ReactNode } from 'react';

type BackgroundColorContextType = {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
};

const BackgroundColorContext = createContext<BackgroundColorContextType | undefined>(undefined);

export const BackgroundColorProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundColor, setBackgroundColor] = useState('bg-primary');

  return (
    <BackgroundColorContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </BackgroundColorContext.Provider>
  );
};

export const useBackgroundColor = () => {
  const context = useContext(BackgroundColorContext);
  if (!context) {
    throw new Error('BackgroundColorProvider Error');
  }
  return context;
};
