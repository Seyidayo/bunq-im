import api from 'app/api';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import LoginTemplate from 'app/components/templates/Login.template';
import style from './Login.module.scss';

const LoginPage = () => {
  const [active, setActive] = useState(false);
  const history = useHistory();

  useEffect(() => {
    api
      .get('/ping')
      .then((response) => response.data)
      .then(() => setActive(true));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('token', process.env.REACT_APP_API_TOKEN);
    history.push('/im');
  };
  return (
    <LoginTemplate>
      <form onSubmit={handleSubmit} className={`container ${style.container}`}>
        <p>bunq instant messaging</p>
        <input type="email" defaultValue="bunqer" />
        <input type="password" defaultValue="bunqer" />
        <button type="submit" onClick={handleSubmit} disabled={!active}>
          Login
        </button>
      </form>
    </LoginTemplate>
  );
};

export default LoginPage;
