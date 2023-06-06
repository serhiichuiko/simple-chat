import moment from 'moment';
import 'moment-duration-format';

import './style.css';

const CommentItem = ({ message }) => {
  const timestamp = message.user.time;
  let formattedTime = '';

  if (timestamp) {
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(timestamp));
    formattedTime = duration.format('h [hours] m [minutes] ago');
  }
  return (
    <div className='comment'>
      <div className='title'>{message.body}</div>
      <div className='user-info'>
        <div className='time'>{formattedTime}</div>
        <div className='user'>{message.user.username}</div>
      </div>
    </div>
  );
};

export default CommentItem;
