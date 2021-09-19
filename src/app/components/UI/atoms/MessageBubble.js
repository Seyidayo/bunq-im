import { parseTime } from 'app/utils/helpers';

const MessageBox = ({ date, text }) => {
  return (
    <div className="message__bubble__wrapper">
      <div className="message__bubble">{text}</div>
      <span>{parseTime(date)}</span>
    </div>
  );
};

export default MessageBox;
