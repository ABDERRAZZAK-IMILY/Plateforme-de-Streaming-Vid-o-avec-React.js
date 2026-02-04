import { useState, useEffect } from 'react';
import type { User } from '../model/User.model';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('loggedUser');
    setCurrentUser(null);
  };

  return { currentUser, login, logout, loading, isAuthenticated: !!currentUser };
};