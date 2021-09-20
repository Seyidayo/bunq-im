import PropTypes from 'prop-types';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

import Modal from 'app/components/UI/atoms/Modal/Modal';
import UserSelect from 'app/components/UI/molecules/UserSelect';
import Spinner from 'app/components/UI/atoms/Spinner';
import ConversationApiService from 'app/api/conversations';
import DataContext from 'app/context';

const CreateConversationsModal = ({ location }) => {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ user_ids: [], name: '' });
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const [user_id, setUserId] = useState(location.pathname.split('/')[2]);
  const { fetchLatestConversations } = useContext(DataContext);

  const handleChange = (event) => {
    event.preventDefault();
    const { target } = event;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleUserIdChange = (user_ids) => {
    setForm({ ...form, user_ids });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.user_ids.length) {
      return;
    }
    try {
      setStatus('submitting');
      await ConversationApiService.createConversation({
        user_id,
        payload: form,
      })
        .then((response) => response.data)
        .then(({ data: { id } }) => {
          // Open the messages input
          setModalOpen(false);
          fetchLatestConversations(user_id);
          history.push(`/im/${user_id}/conversation/${id}`);
        });
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  const handleOpenModal = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = (event) => {
    event.preventDefault();
    setModalOpen(false);
  };

  useEffect(() => {
    setUserId(location.pathname.split('/')[2]);
  }, [location]);

  if (!user_id) {
    return <></>;
  }

  return (
    <Fragment>
      <button
        onClick={handleOpenModal}
        className="secondary"
        title="Create group conversation"
      >
        CG
      </button>
      <Modal isModalOpen={isModalOpen} onCloseModal={handleCloseModal}>
        <header className="modal__header">
          <h1 className="h3 text-orange">Start group conversation</h1>
        </header>
        <div className="modal__content">
          <form onSubmit={handleSubmit} id="create-conversation-form">
            <label htmlFor="name-input">Group name</label>
            <input
              id="name-input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Add a group name"
              required
            />

            <label htmlFor="">Add members</label>
            <UserSelect name="user_id" onChange={handleUserIdChange} />
          </form>
          <div className="modal__footer">
            <button
              type="button"
              className="secondary"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button type="submit" form="create-conversation-form">
              {status === 'submitting' && (
                <>
                  <Spinner /> &nbsp;
                </>
              )}{' '}
              Create
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

CreateConversationsModal.propTypes = {
  location: PropTypes.object,
};

export default withRouter(CreateConversationsModal);
