import UsersConversations from 'app/components/UI/organisms/ViewConversations';
import UsersMessages from 'app/components/UI/organisms/ViewMessages';

const MessagesPage = () => {
  return (
    <UsersConversations>
      <UsersMessages />
    </UsersConversations>
  );
};

export default MessagesPage;
