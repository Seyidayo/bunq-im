import api from 'app/api';

/**
 * Fetch users conversations
 * @param {string} {user_id}
 */
const fetchConversations = async ({ user_id }) => {
  return await api.get(`/user/${user_id}/conversation`);
};

/**
 * Fetch conversation details
 * @param {string} {user_id
 * @param {string} conversation_id}
 */
const fetchConversation = async ({ user_id, conversation_id }) => {
  return await api.get(`/user/${user_id}/conversation/${conversation_id}`);
};

/**
 * Create conversations
 * @param {string} {user_id
 * @param {object} payload}
 * @param {array} payload.user_id}
 * @param {array} payload.user_ids}
 */
const createConversation = async ({ user_id, payload }) => {
  return await api.post(`/user/${user_id}/conversation`, payload);
};

const ConversationApiService = {
  fetchConversations,
  fetchConversation,
  createConversation,
};

export default ConversationApiService;
