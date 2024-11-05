import { useNavigate } from 'react-router-dom';

import { MenuButton } from './MenuButton';

import { useIntroStore } from 'stores';

export const Header = () => {
  const navigate = useNavigate();
  const isVisible = useIntroStore(state => state.isVisible);

  return (
    <div className='absolute flex items-center justify-center w-full h-[6rem] top-0 z-[20000]'>
      <h1
        className='absolute top-4 left-4 w-[3rem] h-[4rem] border-4 border-[#ef6767] flex items-center justify-center p-1 cursor-pointer'
        onClick={() => {
          navigate('/');
        }}
      >
        <img alt='logo' className='object-contain' src='/Logo.svg' />
      </h1>

      {!isVisible && <MenuButton />}
    </div>
  );
};
