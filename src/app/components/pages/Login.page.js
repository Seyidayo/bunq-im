import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from 'app/api';
import useAuth from 'app/hooks/useAuth';
import Spinner from 'app/components/UI/atoms/Spinner';

const LoginPage = () => {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({
    email: 'bunqer@bunq.com',
    password: 'bunqer123',
  });
  const history = useHistory();
  const isLoggedIn = useAuth();

  const handleChange = (event) => {
    event.preventDefault();
    const { target } = event;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setStatus('submitting');
      await api.get('/ping').then((response) => response.data);
      history.push('/im');
    } catch {
      setStatus('error');
    } finally {
      setStatus('idle');
    }
  };

  useEffect(() => {
    const initializeApp = () => {
      if (isLoggedIn) {
        history.push('/im');
      }
      localStorage.setItem('token', process.env.REACT_APP_API_TOKEN);
    };

    initializeApp();
  }, [isLoggedIn, history]);

  return (
    <form onSubmit={handleLogin} className="container login__container">
      <h1 className="h4">bunqIM</h1>
      <label for="email-input" hidden>
        Email address
      </label>
      <input
        id="email-input"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email address"
      />

      <label for="password-input" hidden>
        Password
      </label>
      <input
        id="password-input"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <button
        type="submit"
        disabled={status === 'loading' || status === 'submitting'}
      >
        {status === 'submitting' && <Spinner />} &nbsp; Log in
      </button>
    </form>
  );
};

export default LoginPage;
