import { useState, useEffect } from 'react';

export const useModalAnimation = (onClose: () => void) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return { isVisible, handleClose };
};
