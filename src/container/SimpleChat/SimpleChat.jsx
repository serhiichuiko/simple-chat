import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addMessage, fetchMessages } from '../../actions/chatActions';
import CommentItem from '../../components/CommentItem/CommentItem';
import Form from '../../components/Form/Form';
import './style.css';

const SimpleChat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const isLoaded = useSelector((state) => state.isLoaded);
  const error = useSelector((state) => state.error);
  const commentBlockRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (message) => {
    dispatch(addMessage(message));
  };

  const scrollToBottom = () => {
    if (commentBlockRef.current) {
      commentBlockRef.current.scrollTop = commentBlockRef.current.scrollHeight;
    }
  };

  return (
    <div className='container'>
      <Form onSubmit={handleSubmit} />
      {!isLoaded && <div>Loading...</div>}
      <div className='comment-block' ref={commentBlockRef}>
        <TransitionGroup>
          {messages.map((message) => (
            <CSSTransition key={message.id} timeout={500} classNames='item'>
              <CommentItem message={message} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default SimpleChat;
