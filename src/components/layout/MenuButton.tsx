import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Icon, Profile } from 'components';

export const MenuButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState(false);
  const [isStretchSearch, setIsStretchSearch] = useState(false);

  const handleButtonClick = (pathname: string) => {
    navigate(pathname);
    setIsClick(false);
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
          <Icon alt='search' src='/menu/Search.svg' />
          {isStretchSearch && (
            <input className='w-full focus:out' placeholder='search' type='text' />
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
      <Button position={isClick && !isStretchSearch ? 'profile' : 'default'} variant='white'>
        <Profile />
      </Button>
    </>
  );
};
