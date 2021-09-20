import { useEffect, useState } from 'react';

const useAuth = () => {
  const token = localStorage.getItem('token');

  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return isLoggedIn;
};

export default useAuth;
