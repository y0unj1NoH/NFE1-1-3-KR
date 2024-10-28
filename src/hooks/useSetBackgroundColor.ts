import { useEffect } from 'react';

import { useBackgroundColor } from 'context';

export const useSetBackgroundColor = (color: string) => {
  const { setBackgroundColor } = useBackgroundColor();

  useEffect(() => {
    setBackgroundColor(color);
    return () => {
      setBackgroundColor('bg-primary');
    };
  }, [setBackgroundColor, color]);
};
