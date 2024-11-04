import { useEffect, useRef, useState } from 'react';

type DropdownState = (initialState: boolean) => {
  isOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  toggleDropdown: () => void;
};

export const useDropdown: DropdownState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = ({ target }: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, dropdownRef, toggleDropdown };
};
