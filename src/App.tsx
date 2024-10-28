import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from 'components';
import { ModalProvider } from 'context';
import { CommunityPage } from 'pages/community';
import BookModal from 'pages/modal/BookModal';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <></>,

    children: [
      {
        path: '/',
        element: <></>,
      },
      {
        path: '/book/:id',
        element: <></>,
      },
      { path: '/community', element: <CommunityPage /> },
      { path: '/profile', element: <></> },
      { path: '/modal', element: <BookModal /> },
    ],
  },
]);

function App() {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  );
}

export default App;
