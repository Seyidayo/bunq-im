import UsersConversations from 'app/components/UI/organisms/Conversations';
import UsersMessages from 'app/components/UI/organisms/Messages';

const MessagesPage = () => {
  return (
    <UsersConversations>
      <UsersMessages />
    </UsersConversations>
  );
};

export default MessagesPage;
