import React from 'react';
import { Redirect } from 'react-router-dom';

import useAuth from 'app/hooks/useAuth';

const ProtectedRoutesWrapper = ({ children }) => {
  const isLoggedIn = useAuth();
  return !isLoggedIn ? <Redirect to="/" /> : <>{children}</>;
};

export default ProtectedRoutesWrapper;
