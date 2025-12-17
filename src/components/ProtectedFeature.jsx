import React from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * ProtectedFeature Component
 * For protecting individual features/buttons without redirecting
 * Shows lock icon and triggers login when clicked if not authenticated
 */
const ProtectedFeature = ({ 
  children, 
  onLoginRequired, 
  showLockIcon = true,
  lockMessage = "🔒 Login Required"
}) => {
  const { isAuthenticated } = useAuth();

  const handleClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      e.stopPropagation();
      if (onLoginRequired) {
        onLoginRequired();
      }
    }
  };

  if (!isAuthenticated && showLockIcon) {
    return (
      <div className="relative group" onClick={handleClick}>
        {children}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
          {lockMessage}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedFeature;
