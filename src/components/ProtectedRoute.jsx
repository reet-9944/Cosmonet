import React from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * ProtectedRoute Component
 * Wraps any component/feature that requires authentication
 * Shows login prompt if user is not authenticated
 */
const ProtectedRoute = ({ children, onLoginRequired, fallback }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, trigger login modal or show fallback
  if (!isAuthenticated) {
    if (onLoginRequired) {
      onLoginRequired();
      return fallback || (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Authentication Required</h2>
            <p className="text-gray-400 text-lg">Please log in to access this feature</p>
          </div>
        </div>
      );
    }
    
    return fallback || (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-3xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-400 text-lg">Please log in to access this feature</p>
        </div>
      </div>
    );
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
