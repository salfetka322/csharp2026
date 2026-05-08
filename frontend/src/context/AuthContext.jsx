import { createContext, useEffect, useState } from 'react';
import Loader from '../components/UI/Loader';
import { checkAuth } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token && token !== 'null' && token !== 'undefined') {
        try {
          await checkAuth(setIsAuth, setUser);
        } catch (e) {
          console.error('Auth check failed:', e);
          localStorage.removeItem('token');
          setIsAuth(false);
          setUser(null);
        }
      } else {
        setIsAuth(false);
        setUser(null);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth, isOpenSignUp, setIsOpenSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};
