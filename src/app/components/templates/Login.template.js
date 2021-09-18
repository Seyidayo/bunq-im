import style from './LoginTemplate.module.scss';

const LoginTemplate = ({ children }) => {
  return <div className={style.wrapper}>{children}</div>;
};

export default LoginTemplate;
