import api from 'app/api';

const fetchMessages = async ({ user_id, conversation_id }) => {
  return await api.get(
    `/user/${user_id}/conversation/${conversation_id}/message`
  );
};

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
