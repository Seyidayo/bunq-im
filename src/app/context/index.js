import { createContext, useState } from 'react';
import ConversationApiService from 'app/api/conversations';
import UserApiService from 'app/api/users';

const DataContext = createContext({
  users: [],
  setUsers: () => {},
  conversations: [],
  setConversations: () => [],
});

const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState({});

  const fetchUsers = async () => {
    await UserApiService.fetchUsers()
      .then((response) => response.data)
      .then(({ data }) => setUsers(data));
  };

  const fetchLatestConversations = async (user_id) => {
    await ConversationApiService.fetchConversations({ user_id })
      .then((response) => response.data)
      .then(({ data }) =>
        setConversations({ ...conversations, [user_id]: data })
      );
  };

  return (
    <DataContext.Provider
      value={{
        users,
        fetchUsers,
        conversations,
        fetchLatestConversations,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

export { DataProvider };
