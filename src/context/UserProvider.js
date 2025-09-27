import React, { createContext, useState, useEffect, useContext } from 'react';
import { getProfile } from '../api/auth';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    if (token) {
      const response = await getProfile();
      setUser(response.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
