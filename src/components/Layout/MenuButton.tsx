import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Icon } from 'components/Common';

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
        position='menu'
        variant={location.pathname.startsWith('/community') ? 'gold' : 'coral'}
        onClick={() => {
          setIsClick(prev => !prev);
          setIsStretchSearch(false);
        }}
      >
        <Icon alt='menu' src='/menu/Menu.svg' />
      </Button>
      <Button
        position={isClick ? 'search' : 'default'}
        stretch={isStretchSearch ? 'search' : 'default'}
        variant='white'
        onClick={() => {
          setIsStretchSearch(true);
        }}
      >
        <>
          <Icon alt='search' src='/menu/Search.svg' />
          {isStretchSearch && (
            <input className='w-full focus:out' placeholder='search' type='text' />
          )}
        </>
      </Button>
      <Button
        position={isClick && !isStretchSearch ? 'community' : 'default'}
        variant='white'
        onClick={() => {
          handleButtonClick('/community');
        }}
      >
        <Icon alt='community' src='/menu/Community.svg' />
      </Button>
      <Button
        position={isClick && !isStretchSearch ? 'profile' : 'default'}
        variant='white'
        onClick={() => {
          handleButtonClick('/profile');
        }}
      >
        <Icon alt='profile' src='/menu/Profile.svg' />
      </Button>
    </>
  );
};
