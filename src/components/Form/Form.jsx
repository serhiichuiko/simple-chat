import { useCallback, useEffect, useState } from 'react';

import './style.css';

const Form = ({ onSubmit }) => {
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const inputValue = localStorage.getItem('inputValue');
    if (inputValue) {
      setNewMessage(inputValue);
    }
  }, []);

  const handleChangeMessage = useCallback(
    (event) => {
      const value = event ? event.target.value : '';

      localStorage.setItem('inputValue', value);

      setNewMessage(value);
    },
    [setNewMessage]
  );

  const handleSendMessage = useCallback(
    (event) => {
      event.preventDefault();
      if (newMessage.trim() !== '') {
        onSubmit(newMessage);
        handleChangeMessage(null);
      }
    },
    [onSubmit, handleChangeMessage, newMessage]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleSendMessage(event);
      }
    },
    [handleSendMessage]
  );

  return (
    <form onSubmit={handleSendMessage}>
      <div className='field'>
        <textarea
          className='textArea'
          required
          placeholder='Comment'
          type='text'
          value={newMessage}
          onChange={handleChangeMessage}
          onKeyDown={handleKeyDown}
        />
        <div className='button'>
          <button type='submit'>Send</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
