import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MessageApiService from 'app/api/messages';
import DataContext from 'app/context';
import MessageBubble from 'app/components/UI/atoms/MessageBubble/MessageBubble';
import Spinner from 'app/components/UI/atoms/Spinner';
import Loader from 'app/components/UI/atoms/Loader/Loader';
import ConversationApiService from 'app/api/conversations';

const Messages = () => {
  const [status, setStatus] = useState('idle');
  const { fetchLatestConversations } = useContext(DataContext);
  const { user_id, conversation_id } = useParams();

  const [messages, setMessages] = useState([]);
  const [details, setDetails] = useState({});
  const [form, setForm] = useState({ text: '' });

  const getDetails = () => {
    let _details = {};
    if (!details.name && details.members) {
      _details = { ...details.members[0] };
    } else {
      _details.name = details.name;
    }

    return _details;
  };

  const fetchConversationDetails = async () => {
    try {
      await ConversationApiService.fetchConversation({
        user_id,
        conversation_id,
      })
        .then((response) => response.data)
        .then(({ data }) => {
          setDetails(data);
        });
    } catch (error) {
      setStatus('error');
    } finally {
      setStatus('idle');
    }
  };

  const fetchLatestMessagesInConversation = async () => {
    try {
      setStatus('loading');
      await MessageApiService.fetchMessages({ user_id, conversation_id })
        .then((response) => response.data)
        .then(({ data }) => {
          data.reverse();
          setMessages(data);
        });
      setStatus('idle');
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { target } = event;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!form.text) {
      return;
    }

    try {
      setStatus('submitting');
      await MessageApiService.createMessage({
        user_id,
        conversation_id,
        payload: form,
      })
        .then((response) => response.data)
        .then(() => {
          // - Refetch messages
          fetchLatestMessagesInConversation();
          // - Refetch conversations
          fetchLatestConversations(user_id);
          // - Reset form
        });
    } catch (error) {
      setStatus('error');
    } finally {
      setForm({ text: '' });
      setStatus('idle');
    }
  };

  // Fetch messages
  useEffect(() => {
    fetchConversationDetails();
    fetchLatestMessagesInConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation_id]);

  return (
    <section>
      <header className="header">
        <h2 className="text-orange h4">{getDetails().name || 'Messages'}</h2>
      </header>
      <div className="messages__wrapper">
        <div className="messages__container">
          {status === 'loading' && <Loader />}
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              isSender={message.user_id.toString() === user_id.toString()}
              message={message}
            />
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          className="messages__action-bar"
          id="create-message-form"
        >
          <div className="messages__action-bar__container">
            <label htmlFor="message-input" hidden>
              Message
            </label>
            <input
              type="text"
              id="message-input"
              name="text"
              autoFocus={true}
              onChange={handleChange}
              value={form.text}
              placeholder={
                messages.length ? 'Write a message' : 'Start a conversation'
              }
            />
            <div>
              <button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' && (
                  <>
                    <Spinner /> &nbsp;
                  </>
                )}{' '}
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Messages;
