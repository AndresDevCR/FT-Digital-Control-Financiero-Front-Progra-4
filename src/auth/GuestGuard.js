import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingScreen from '../components/loading-screen';
import { useAuthContext } from './useAuthContext';

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { push } = useRouter();
  const { isAuthenticated, isInitialized } = useAuthContext();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      push('/dashboard');
    }
  }, [isAuthenticated, isInitialized, push]);

  if (!isInitialized) {
    // Show a loading screen until the authentication status is determined
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
