import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginTemplate from 'app/components/templates/Login.template';
import AppTemplate from 'app/components/templates/App.template';
import ProtectedRoutesWrapper from 'app/components/UI/organisms/ProtectedRoutesWrapper';

import LoginPage from 'app/components/pages/Login.page';
import ErrorPage from 'app/components/pages/Error.page';
import UserPage from 'app/components/pages/User.page';
import MessagesPage from 'app/components/pages/Messages.page';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <LoginTemplate>
            <LoginPage />
          </LoginTemplate>
        </Route>
        <ProtectedRoutesWrapper>
          <AppTemplate>
            <Switch>
              <Route
                path="/im/:user_id/conversation/:conversation_id"
                component={MessagesPage}
                exact={true}
              />
              <Route path="/im/:user_id" component={UserPage} exact={true} />
              <Route path="/im" component={UserPage} exact={true} />
              <Route path="" component={ErrorPage} />
            </Switch>
          </AppTemplate>
        </ProtectedRoutesWrapper>
        <Route path="" component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
