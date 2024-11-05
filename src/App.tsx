import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUserInfo } from 'api';
import { Layout, ModalRenderer, ProtectedRoutes } from 'components';
import { ModalProvider, BackgroundColorProvider } from 'context';
import { supabase } from 'lib/supabase';
import { CommunityPage, MyPage, HomePage, DetailPage, SearchPage } from 'pages';
import 'styles/toast.css';
import { fetchAndSetBookmarks, useAuthStore } from 'stores';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <></>,

    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/book/:id',
        element: <></>,
      },
      { path: '/community', element: <CommunityPage /> },
      { path: '/community/:id', element: <DetailPage /> },
      {
        path: '/profile',
        element: (
          <ProtectedRoutes>
            <MyPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  const { reset, setSession, setIsLoading, setUserInfo } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session) {
          setSession(session);

          const userInfo = await getUserInfo(session.user.id);
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        reset();
      } finally {
        setIsLoading(false);
      }
    };

    void initializeAuth();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        reset();
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchAndSetBookmarks();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BackgroundColorProvider>
        <ModalProvider>
          <RouterProvider router={router} />
          <ModalRenderer />
          <ToastContainer style={{ zIndex: 10001 }} />
        </ModalProvider>
      </BackgroundColorProvider>
    </QueryClientProvider>
  );
}

export default App;
