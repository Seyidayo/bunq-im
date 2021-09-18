import { NavLink } from 'react-router-dom';

import style from './Error.module.scss';

const ErrorPage = () => {
  return (
    <section className={`${style.container} container`}>
      <h2>Something's missing</h2>
      <p>The thing is the page you're looking for does not exist</p>
      <NavLink to="/">
        <button type="button">Go back</button>
      </NavLink>
    </section>
  );
};

export default ErrorPage;
