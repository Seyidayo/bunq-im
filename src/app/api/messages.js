import api from 'app/api';

/**
 * Fetch conversation messages
 * @param {string} {user_id
 * @param {string} conversation_id}
 */
const fetchMessages = async ({ user_id, conversation_id }) => {
  return await api.get(
    `/user/${user_id}/conversation/${conversation_id}/message`
  );
};

/**
 * Create a new message
 * @param {string} {user_id
 * @param {string} conversation_id
 * @param {object} payload}
 * @param {string} payload.text}
 */
const createMessage = async ({ user_id, conversation_id, payload }) => {
  return await api.post(
    `/user/${user_id}/conversation/${conversation_id}/message`,
    payload
  );
};

const MessageApiService = {
  fetchMessages,
  createMessage,
};

export default MessageApiService;
