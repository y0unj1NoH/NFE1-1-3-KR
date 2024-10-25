import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Header } from 'components/Layout';

const router = createBrowserRouter([
  {
    element: <Header />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
