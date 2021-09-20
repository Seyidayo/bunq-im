import api from 'app/api';

/**
 * Fetch users
 */
const fetchUsers = async () => {
  return await api.get('/user');
};

/**
 * Fetch user details
 * @param {string} user_id
 */
const fetchUser = async (user_id) => {
  return await api.get(`/user/${user_id}`);
};

const UserApiService = {
  fetchUsers,
  fetchUser,
};

export default UserApiService;
