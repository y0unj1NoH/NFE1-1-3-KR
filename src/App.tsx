import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from 'components';
import { ModalProvider, BackgroundColorProvider } from 'context';
import { CommunityPage, MyPage, BookModal, HomePage } from 'pages';

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
        path: '/book/:id',
        element: <></>,
      },
      { path: '/community', element: <CommunityPage /> },
      { path: '/profile', element: <MyPage /> },
      { path: '/modal', element: <BookModal /> },
    ],
  },
]);

function App() {
  return (
    <BackgroundColorProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </BackgroundColorProvider>
  );
}

export default App;
