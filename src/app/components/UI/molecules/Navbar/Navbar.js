import { useState } from 'react';
import { Link, useHistory, useParams, withRouter } from 'react-router-dom';

import Spinner from 'app/components/UI/atoms/Spinner';
import CreateConversationsModal from 'app/components/UI/molecules/CreateConversationsModal';

const Navbar = ({ match, location }) => {
  const [status, setStatus] = useState('idle');
  const history = useHistory();
  const { user_id } = useParams();
  console.log(location, match, user_id);

  const handleLogout = (event) => {
    event.preventDefault();
    setStatus('submitting');
    localStorage.removeItem('token');
    setTimeout(() => {
      history.push('/');
      setStatus('idle');
    });
  };

  return (
    <header className="header text-orange navbar__header">
      <Link to="/im">
        <h1 className="h4">bunqIM</h1>
      </Link>
      <ul>
        <li>
          <CreateConversationsModal />
        </li>
        <li>
          <button
            onClick={handleLogout}
            type="button"
            className="secondary"
            title="Logout"
          >
            {status === 'submitting' ? <Spinner /> : 'LG'}
          </button>
        </li>
      </ul>
    </header>
  );
};

export default withRouter(Navbar);
