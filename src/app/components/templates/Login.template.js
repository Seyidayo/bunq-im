import GithubIcon from 'app/assets/icons/github.svg';

const LoginTemplate = ({ children }) => {
  return (
    <div className="login__wrapper">
      {children}
      <p>
        <img src={GithubIcon} alt=" " loading="lazy" width="32px" />
        Source code can be found{' '}
        <a
          href="https://github.com/seyidayo/bunq-im"
          className="text-orange"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>{' '}
      </p>
    </div>
  );
};

export default LoginTemplate;
