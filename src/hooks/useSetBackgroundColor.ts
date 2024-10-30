import { useLayoutEffect } from 'react';

import { useBackgroundColorDispatch, setBackgroundColor } from 'context';

export const useSetBackgroundColor = (color: string, active = true) => {
  const dispatch = useBackgroundColorDispatch();

  useLayoutEffect(() => {
    if (!active) return;

    setBackgroundColor(dispatch, color);
  }, [color, dispatch, active]);
};
