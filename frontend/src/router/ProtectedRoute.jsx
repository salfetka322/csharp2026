import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
