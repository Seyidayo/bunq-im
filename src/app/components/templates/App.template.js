import Users from 'app/components/UI/organisms/ViewUsers';

const AppTemplate = ({ children }) => {
  return (
    <div className="app__wrapper">
      <Users />
      <main className="app__container">{children}</main>
    </div>
  );
};

export default AppTemplate;
