import { useLocation, useNavigate } from 'react-router-dom';

import { MenuButton } from './MenuButton';

import { PopularPosts } from 'pages/community';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='relative flex items-center justify-center w-full h-[6rem]'>
      <h1
        className='absolute top-4 left-4 w-[3rem] h-[4rem] border-4 border-[#ef6767] flex items-center justify-center p-1'
        onClick={() => {
          navigate('/');
        }}
      >
        <img alt='logo' className='object-contain' src='/Logo.svg' />
      </h1>
      {location.pathname.startsWith('/community') && <PopularPosts />}
      <MenuButton />
    </div>
  );
};
