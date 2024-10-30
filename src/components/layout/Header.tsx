import { useLocation, useNavigate } from 'react-router-dom';

import { MenuButton } from './MenuButton';

import { PopularPosts } from 'pages/community';
import { useIntroStore } from 'stores';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isVisible = useIntroStore(state => state.isVisible);

  return (
    <div className='absolute flex items-center justify-center w-full h-[6rem] top-0 z-[9999]'>
      <h1
        className='absolute top-4 left-4 w-[3rem] h-[4rem] border-4 border-[#ef6767] flex items-center justify-center p-1'
        onClick={() => {
          navigate('/');
        }}
      >
        <img alt='logo' className='object-contain' src='/Logo.svg' />
      </h1>
      {location.pathname.startsWith('/community') && <PopularPosts />}
      {!isVisible && <MenuButton />}
    </div>
  );
};
