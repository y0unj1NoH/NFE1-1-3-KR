import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from 'stores';

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-lg'>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to='/' />;
  }

  return <>{children}</>;
};
