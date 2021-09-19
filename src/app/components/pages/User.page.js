import { useParams } from 'react-router-dom';

import UsersConversations from 'app/components/UI/organisms/Conversations';

const UsersPage = () => {
  const { user_id } = useParams();

  if (!user_id) {
    return (
      <section className="empty__container">
        <h2 className="text-orange">Welcome back!</h2>
        <p>Start chatting</p>
      </section>
    );
  }

  return <UsersConversations />;
};

export default UsersPage;
