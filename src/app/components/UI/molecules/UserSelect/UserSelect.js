import { useContext, useEffect, useState } from 'react';

import DataContext from 'app/context';
import Loader from '../../atoms/Loader/Loader';

const UserSelect = ({ onChange, name }) => {
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState('idle');
  const { users, fetchUsers } = useContext(DataContext);

  const handleChange = (user_id) => {
    let selectedArray = selected;
    const find = selected.indexOf(user_id);

    if (find > -1) {
      selectedArray.splice(find, 1);
    } else {
      selectedArray.push(user_id);
    }
    setSelected(selectedArray);
    onChange(selected);
  };

  useEffect(() => {
    if (!users.length) {
      try {
        setStatus('loading');
        fetchUsers();
        setStatus('fetched');
      } catch {
        setStatus('error');
      }
    }

    //eslint-disable-next-line
  }, [users]);

  if (status === 'loading' && !users.length) {
    return <Loader />;
  }

  return (
    <ul className="user-select__wrapper">
      {users.map((user) => (
        <li key={user.id}>
          <label>
            <input
              type="checkbox"
              name={name}
              onChange={() => handleChange(user.id)}
              selected={selected.includes(user.id)}
              hidden
            />
            <div className="user-select">
              <img
                className="user__avatar"
                width="40px"
                height="40px"
                loading="lazy"
                src={`https://i.pravatar.cc/40?img=${user.id}`}
                alt={user.name}
              />
              <p className="user__name"> {user.name}</p>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default UserSelect;
