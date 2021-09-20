import api from 'app/api';

const fetchConversations = async ({ user_id }) => {
  return await api.get(`/user/${user_id}/conversation`);
};

const fetchConversation = async ({ user_id, conversation_id }) => {
  return await api.get(`/user/${user_id}/conversation/${conversation_id}`);
};

const createConversation = async ({ user_id, payload }) => {
  return await api.post(`/user/${user_id}/conversation`, payload);
};

const ConversationApiService = {
  fetchConversations,
  fetchConversation,
  createConversation,
};

export default ConversationApiService;
