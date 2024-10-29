import { Outlet } from 'react-router-dom';

import { Header } from './Header';

import { useBackgroundColorState } from 'context';

export const Layout = () => {
  const { backgroundColor } = useBackgroundColorState();

  return (
    <>
      <Header />
      <main className={`mx-auto pt-[6rem] w-full min-h-[calc(100vh-6rem)] ${backgroundColor}`}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
