import { useEffect, useRef, useState } from 'react';

interface UseDropdownProps {
  initialState?: boolean;
}

interface UseDropdownReturn {
  isOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  toggleDropdown: () => void;
}

export const useDropdown = ({ initialState = false }: UseDropdownProps): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState(initialState);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = ({ target }: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(target as Node)) {
      setIsOpen(false);
    }
  };

  const handleEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleOutsideClick);
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, dropdownRef, toggleDropdown };
};
