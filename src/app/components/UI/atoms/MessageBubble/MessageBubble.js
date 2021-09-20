import PropTypes from 'prop-types';
import { parseTime } from 'app/utils/helpers';

const MessageBox = ({ message, isSender }) => {
  return (
    <div className={`message__bubble__wrapper`} data-sender={isSender}>
      <div className="message__bubble__container">
        <img
          className="user__avatar"
          width="35px"
          height="35px"
          loading="lazy"
          src={`https://i.pravatar.cc/35?img=${message.user_id}`}
          alt=" "
        />
        <div className="message__bubble">{message.text}</div>
      </div>
      <span>{parseTime(message.sent_at)}</span>
    </div>
  );
};

MessageBox.defaultProps = {
  isSender: false,
};

MessageBox.propTypes = {
  message: PropTypes.object.isRequired,
  isSender: PropTypes.bool.isRequired,
};

export default MessageBox;
