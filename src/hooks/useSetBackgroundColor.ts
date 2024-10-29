import { useBackgroundColorDispatch, setBackgroundColor } from 'context';

export const useSetBackgroundColor = (color: string) => {
  const dispatch = useBackgroundColorDispatch();
  setBackgroundColor(dispatch, color);
};
