import { Fragment, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import DataContext from 'app/context';
import { parseTime } from 'app/utils/helpers';
import Loader from 'app/components/UI/atoms/Loader/Loader';
import Navbar from 'app/components/UI/molecules/Navbar/Navbar';

const Users = () => {
  const { users, fetchUsers } = useContext(DataContext);
  const [status, setStatus] = useState('idle');

  // Fetch all users
  useEffect(() => {
    async function fetchData() {
      try {
        setStatus('loading');
        await fetchUsers();
        setStatus('fetched');
      } catch {
        setStatus('error');
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className="app__sidebar">
      <Navbar />
      {status === 'loading' && !users.length ? (
        <Loader />
      ) : status === 'fetched' && users.length < 1 ? (
        <div className="empty__container">
          <h2>No one's here at the moment!</h2>
          <span>Check back later</span>
        </div>
      ) : (
        users.map((user) => (
          <Fragment key={user.id}>
            <NavLink
              to={`/im/${user.id}`}
              className="app__sidebar__link"
              activeClassName="active"
            >
              <img
                className="user__avatar"
                width="50px"
                height="50px"
                loading="lazy"
                src={`https://i.pravatar.cc/50?img=${user.id}`}
                alt={user.name}
              />
              <p className="user__name"> {user.name}</p>
              <span className="user__last-seen">
                {parseTime(user.last_seen_at)}
              </span>
            </NavLink>
          </Fragment>
        ))
      )}
    </aside>
  );
};

export default Users;
