import { Fragment, useContext, useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';

import ConversationApiService from 'app/api/conversations';
import DataContext from 'app/context';
import Loader from 'app/components/UI/atoms/Loader';
import Spinner from 'app/components/UI/atoms/Spinner';
import { getRandomQuote } from 'app/utils/helpers';

const MAX_USERS = 3;

const Conversations = ({ children }) => {
  const [status, setStatus] = useState('idle');
  const { conversations, fetchLatestConversations } = useContext(DataContext);
  const { user_id } = useParams();
  const history = useHistory();

  // Start a new conversation
  const handleStartConversation = async (event) => {
    event.preventDefault();
    try {
      setStatus('submitting');
      await ConversationApiService.createConversation({
        user_id,
        payload: {
          user_ids: [user_id],
        },
      })
        .then((response) => response.data)
        .then(({ data: { id } }) =>
          // Open the messages input
          history.push(`/im/${user_id}/conversation/${id}`)
        );
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  // Fetch users conversations
  useEffect(() => {
    async function fetchData() {
      try {
        setStatus('loading');
        await fetchLatestConversations(user_id);
        setStatus('fetched');
      } catch {
        setStatus('error');
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  if (status === 'loading' && !conversations[user_id]) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  return (
    <Fragment>
      {conversations[user_id]?.length < 1 ? (
        <section className="empty__container">
          <h3 className="h4">{getRandomQuote()}</h3>
          <button
            type="button"
            onClick={handleStartConversation}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' && <Spinner />} &nbsp; Start a conversation
          </button>
        </section>
      ) : (
        <section className="conversation__wrapper">
          <aside>
            <header className="header">
              <h2 className="text-orange h4">Conversations</h2>
            </header>
            {conversations[user_id]?.map((conversation, index) => (
              <NavLink
                key={conversation.id + index}
                to={`/im/${user_id}/conversation/${conversation.id}`}
                className="conversation__link"
                activeClassName="active"
              >
                <div className="conversation__members">
                  {conversation.name && (
                    <strong>{conversation.name}&nbsp; - &nbsp;</strong>
                  )}
                  {conversation.members
                    .slice(0, MAX_USERS)
                    .map((member, index) => (
                      <img
                        key={index + member.id}
                        className="user__avatar"
                        width="30px"
                        height="30px"
                        loading="lazy"
                        src={`https://i.pravatar.cc/50?img=${member.id}`}
                        alt={member.name}
                      />
                    ))}
                  {conversation.members.length - MAX_USERS > 0 && (
                    <span>
                      &nbsp;+{conversation.members.length - MAX_USERS}
                    </span>
                  )}
                </div>

                <span className="text-ellipsis">
                  {conversation.last_message ? (
                    conversation.last_message.text
                  ) : (
                    <em>Start a conversation</em>
                  )}
                </span>
              </NavLink>
            ))}
          </aside>
          {children}
        </section>
      )}
    </Fragment>
  );
};

export default Conversations;
