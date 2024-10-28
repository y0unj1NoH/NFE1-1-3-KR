import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from 'components/Layout';
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
      { path: '/community', element: <></> },
      { path: '/profile', element: <></> },
      { path: '/modal', element: <BookModal /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
