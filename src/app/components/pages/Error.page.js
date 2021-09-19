import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className="error__wrapper container">
      <h2 className="h3">Something's missing</h2>
      <p>The thing is the page you're looking for does not exist</p>
      <Link to="/">
        <button type="button">Go back</button>
      </Link>
    </section>
  );
};

export default ErrorPage;
