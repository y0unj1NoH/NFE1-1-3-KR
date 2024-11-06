import { useEffect, useState } from 'react';

interface UseDropdownAnimationReturn {
  shouldRender: boolean;
  handleTransitionEnd: () => void;
  triggerAnimation: boolean;
}

export const useDropdownAnimation = (isOpen: boolean): UseDropdownAnimationReturn => {
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setComplete(true);
    }
  }, [isOpen]);

  const shouldRender = isOpen || isComplete;
  const triggerAnimation = isOpen && isComplete;

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setComplete(false);
    }
  };

  return {
    shouldRender,
    handleTransitionEnd,
    triggerAnimation,
  };
};
