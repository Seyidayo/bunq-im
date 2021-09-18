import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from 'app/components/pages/Login.page';
import ErrorPage from 'app/components/pages/Error.page';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="" component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
