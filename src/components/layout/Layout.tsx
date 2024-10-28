import { Outlet } from 'react-router-dom';

import { Header } from './Header';

import { useBackgroundColor } from 'context';

export const Layout = () => {
  const { backgroundColor } = useBackgroundColor();

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
