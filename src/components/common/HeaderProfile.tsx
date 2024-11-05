import { IoMdLogIn } from 'react-icons/io';
import { MdPersonOutline } from 'react-icons/md';
import { PiSignOut } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import { DropdownMenu, LoginModal } from 'components';
import { useDropdownAnimation, useDropdown } from 'hooks';
import { supabase } from 'lib/supabase';
import { useAuthStore, useModalStore } from 'stores';

const BeforeLogin = () => {
  const openModal = useModalStore(state => state.openModal);

  const handleLogin = () => {
    openModal('LOGIN', { component: LoginModal });
  };

  return (
    <>
      <IoMdLogIn className='fill-gold-default text-[1.7rem]' onClick={handleLogin} />
    </>
  );
};

const AfterLogin = () => {
  const userInfo = useAuthStore(state => state.userInfo);
  const { isOpen, dropdownRef, toggleDropdown } = useDropdown({ initialState: false });
  const { shouldRender, handleTransitionEnd, triggerAnimation } = useDropdownAnimation(isOpen);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
      navigate('/', { replace: true });
    } catch (error) {
      console.error('로그아웃 에러:', error);
      alert('로그아웃 중 문제가 발생했습니다.');
    }
  };

  return (
    <div
      className='relative flex items-center cursor-pointer'
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      {userInfo?.username}

      {shouldRender && (
        <DropdownMenu onTransitionEnd={handleTransitionEnd} triggerAnimation={triggerAnimation}>
          <ul className='list-none space-y-4 py-2'>
            <li
              className='flex items-center gap-1'
              onClick={() => {
                navigate('/profile');
              }}
            >
              <MdPersonOutline className='fill-gold-default text-[1.7rem]' />
              My page
            </li>

            <li className='flex items-center gap-1' onClick={handleLogOut}>
              <PiSignOut className='fill-gold-default text-[1.7rem]' />
              Sign out
            </li>
          </ul>
        </DropdownMenu>
      )}
    </div>
  );
};

export const HeaderProfile = () => {
  const userInfo = useAuthStore(state => state.userInfo);

  return <>{userInfo ? <AfterLogin /> : <BeforeLogin />}</>;
};
