import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useNavigationType } from 'react-router-dom';
import config from '../config';

const AuthContext = createContext();

const apiLogin = axios.create({
  baseURL: `${config.API_BASE_URL}/api/users/login`,
});

const apiRegister = axios.create({
  baseURL: `${config.API_BASE_URL}/api/users/signup`,
});


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await apiLogin.post("" , credentials);

      if (response.status === 200) {
        setUsername(username);
        setIsAuthenticated(true);
        localStorage.setItem('username', credentials.username); 
        localStorage.setItem('password', credentials.password);
        console.log('UserID', response.data.data.id);
        localStorage.setItem('userID', response.data.data.id);
        localStorage.setItem('isLoggedIn', true);

        console.log('Login successful!');
        return true;
      } else {
        setIsAuthenticated(false);
        console.log('Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const register = async (user) => {
    try {
      const response = await apiRegister.post('', user);

      if (response.status === 201) {
        console.log('Registration successful!');
        return true;
      } else {
        console.log('Registration failed');
        return false;
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUsername(null);
    setIsAuthenticated(false);
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('userID');
    localStorage.removeItem('isLoggedIn');
    console.log('Logged out');
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, isAuthenticated, username }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
