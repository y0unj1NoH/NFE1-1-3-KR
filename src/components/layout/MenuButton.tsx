import { useState, type KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Icon } from 'components/common';
import { useSearchQueryStore } from 'stores';

export const MenuButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState(false);
  const [isStretchSearch, setIsStretchSearch] = useState(false);
  const { query, setQuery } = useSearchQueryStore();

  const handleButtonClick = (pathname: string) => {
    navigate(pathname);
    setIsClick(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick('/search');
    }
  };

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
                setQuery(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder='search'
              type='text'
              value={query}
            />
          )}
        </>
      </Button>
      <Button
        onClick={() => {
          handleButtonClick('/community');
        }}
        position={isClick && !isStretchSearch ? 'community' : 'default'}
        variant='white'
      >
        <Icon alt='community' src='/menu/Community.svg' />
      </Button>
      <Button
        onClick={() => {
          handleButtonClick('/profile');
        }}
        position={isClick && !isStretchSearch ? 'profile' : 'default'}
        variant='white'
      >
        <Icon alt='profile' src='/menu/Profile.svg' />
      </Button>
    </>
  );
};
