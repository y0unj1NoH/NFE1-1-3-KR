import ColorThief from 'colorthief';
import { useState } from 'react';

import { blendColors } from 'utils';

export const useColorThief = () => {
  const [bookColor, setBookColor] = useState<string>();

  const handleOnLoadImage = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(event.currentTarget);
    const blendedColor = `rgb(${blendColors(color).join(',')})`;
    setBookColor(blendedColor);
  };

  return { bookColor, handleOnLoadImage };
};
