import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../apolloClient';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../graphql/queries';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('cosmonet_token');
    const storedUser = localStorage.getItem('cosmonet_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (email, password, name) => {
    try {
      // Validate inputs
      if (!name || name.trim() === '') {
        return { success: false, error: 'Name is required' };
      }
      if (!email || email.trim() === '') {
        return { success: false, error: 'Email is required' };
      }
      if (!password || password.trim() === '') {
        return { success: false, error: 'Password is required' };
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }
      
      // Validate password length
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long' };
      }

      console.log('🔄 Attempting signup with:', { email: email.trim(), name: name.trim() });
      
      const { data } = await client.mutate({
        mutation: SIGNUP_MUTATION,
        variables: { email: email.trim(), password, name: name.trim() }
      });
      
      console.log('📥 Signup response data:', data);
      
      if (!data || !data.signup) {
        console.error('❌ No data returned from server');
        return { success: false, error: 'Server returned no data. Please try again.' };
      }
      
      const { token: newToken, user: newUser} = data.signup;
      
      // Save to localStorage
      localStorage.setItem('cosmonet_token', newToken);
      localStorage.setItem('cosmonet_user', JSON.stringify(newUser));
      
      setToken(newToken);
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('❌ Signup error:', error);
      console.error('📋 Error details:', {
        message: error.message,
        networkError: error.networkError,
        graphQLErrors: error.graphQLErrors,
        fullError: JSON.stringify(error, null, 2)
      });
      
      // Handle network errors (server not running)
      if (error.networkError) {
        console.error('🌐 Network error detected:', error.networkError);
        return { success: false, error: 'Cannot connect to server. Please make sure the server is running on port 4000.' };
      }
      
      if (error.message.includes('fetch') || error.message.includes('Network')) {
        return { success: false, error: 'Cannot connect to server. Please make sure the server is running on port 4000.' };
      }
      
      // Handle GraphQL errors
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const gqlError = error.graphQLErrors[0].message;
        console.error('📝 GraphQL error message:', gqlError);
        
        if (gqlError.includes('already exists') || gqlError.includes('User already exists')) {
          return { success: false, error: 'This email is already registered. Please login instead.' };
        }
        return { success: false, error: gqlError };
      }
      
      return { success: false, error: error.message || 'Signup failed. Please try again.' };
    }
  };

  const login = async (email, password) => {
    try {
      // Validate inputs
      if (!email || email.trim() === '') {
        return { success: false, error: 'Email is required' };
      }
      if (!password || password.trim() === '') {
        return { success: false, error: 'Password is required' };
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      console.log('🔄 Attempting login with:', { email: email.trim() });
      
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email: email.trim(), password }
      });
      
      console.log('📥 Login response data:', data);
      
      if (!data || !data.login) {
        console.error('❌ No data returned from server');
        return { success: false, error: 'Server returned no data. Please try again.' };
      }
      
      const { token: newToken, user: newUser } = data.login;
      
      // Save to localStorage
      localStorage.setItem('cosmonet_token', newToken);
      localStorage.setItem('cosmonet_user', JSON.stringify(newUser));
      
      setToken(newToken);
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('📋 Error details:', {
        message: error.message,
        networkError: error.networkError,
        graphQLErrors: error.graphQLErrors,
        fullError: JSON.stringify(error, null, 2)
      });
      
      // Handle network errors (server not running)
      if (error.networkError) {
        console.error('🌐 Network error detected:', error.networkError);
        return { success: false, error: 'Cannot connect to server. Please make sure the server is running on port 4000.' };
      }
      
      if (error.message.includes('fetch') || error.message.includes('Network')) {
        return { success: false, error: 'Cannot connect to server. Please make sure the server is running on port 4000.' };
      }
      
      // Handle GraphQL errors
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const gqlError = error.graphQLErrors[0].message;
        console.error('📝 GraphQL error message:', gqlError);
        
        if (gqlError.includes('Invalid email or password')) {
          return { success: false, error: 'Invalid email or password. Please check your credentials.' };
        }
        if (gqlError.includes('User not found') || gqlError.includes('not found')) {
          return { success: false, error: 'No account found with this email. Please sign up first.' };
        }
        if (gqlError.includes('password')) {
          return { success: false, error: 'Incorrect password. Please try again.' };
        }
        return { success: false, error: gqlError };
      }
      
      return { success: false, error: error.message || 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('cosmonet_token');
    localStorage.removeItem('cosmonet_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    signup,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
