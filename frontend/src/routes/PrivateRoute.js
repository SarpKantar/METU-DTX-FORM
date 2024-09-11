import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log('Current User:', currentUser);
  
  if (!currentUser) {
    return <Navigate to="/admin/login" />;
  }

  // Eğer kullanıcı admin değilse login sayfasına yönlendir
  if (currentUser.email !== 'admin@example.com') { // Burayı kendi admin e-posta adresinizle değiştirin
    return <Navigate to="/login" />;
  }

  return children; // Eğer admin ise, çocuk bileşeni render et
};

export default PrivateRoute;