import { useEffect, useState, type KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Icon, HeaderProfile } from 'components';
import { useDebounce } from 'hooks';
import { useSearchQueryStore } from 'stores';

export const MenuButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState(false);
  const [isStretchSearch, setIsStretchSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 300);
  const { setQuery } = useSearchQueryStore();

  const handleButtonClick = (pathname: string) => {
    navigate(pathname);
    setIsClick(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick('/search');
    }
  };

  useEffect(() => {
    setQuery(debouncedInputValue);
  }, [debouncedInputValue, setQuery]);

  return (
    <>
      <Button
        onClick={() => {
          setIsClick(prev => !prev);
          setIsStretchSearch(false);
        }}
        position='menu'
        variant={location.pathname.startsWith('/community') ? 'gold' : 'coral'}
      >
        <Icon alt='menu' src='/menu/Menu.svg' />
      </Button>
      <Button
        onClick={() => {
          setIsStretchSearch(true);
        }}
        position={isClick ? 'search' : 'default'}
        stretch={isStretchSearch ? 'search' : 'default'}
        variant='white'
      >
        <>
          <Icon
            alt='search'
            onClick={() => {
              if (isStretchSearch) {
                handleButtonClick('/search');
              }
            }}
            src='/menu/Search.svg'
          />
          {isStretchSearch && (
            <input
              className='w-full focus:out'
              onChange={e => {
                setInputValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder='search'
              type='text'
              value={inputValue}
            />
          )}
        </>
      </Button>
      <Button
        className={`transform transition-all duration-300 ${
          isClick && !isStretchSearch ? 'opacity-100 ' : 'opacity-0  pointer-events-none'
        }`}
        onClick={() => {
          handleButtonClick('/community');
        }}
        position={isClick && !isStretchSearch ? 'community' : 'default'}
        variant='white'
      >
        <Icon alt='community' src='/menu/Community.svg' />
      </Button>

      <Button
        className={`transform transition-all duration-300 ${
          isClick && !isStretchSearch ? 'opacity-100 ' : 'opacity-0  pointer-events-none'
        }`}
        position={isClick && !isStretchSearch ? 'profile' : 'default'}
        variant='white'
      >
        <HeaderProfile />
      </Button>
    </>
  );
};
