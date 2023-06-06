import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';
import {
  FETCH_MESSAGES_START,
  setMessages,
  fetchMessagesFulfilled,
  fetchMessagesRejected,
  ADD_MESSAGE,
} from '../actions/chatActions';

function* fetchMessagesSaga() {
  const messagesInStorage = localStorage.getItem('messages');
  if (messagesInStorage) {
    try {
      const messages = JSON.parse(messagesInStorage);
      yield put(fetchMessagesFulfilled(messages));
    } catch (error) {
      console.error('Bad data in localStorage');
    }
  } else {
    try {
      const response = yield call(axios.get, 'https://dummyjson.com/comments');
      const messages = response.data?.comments;
      yield put(fetchMessagesFulfilled(messages));
      localStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      yield put(fetchMessagesRejected(error.message));
    }
  }
}

function* addMessageSaga(action) {
  const now = moment();
  const formattedTime = now.format('YYYY-MM-DD HH:mm');

  const newMessage = {
    id: new Date().getTime(),
    body: action.payload,
    user: {
      id: 'Me',
      username: 'Me',
      time: formattedTime,
    },
  };
  try {
    const messagesInStorage = localStorage.getItem('messages');
    let messages = [];
    try {
      if (messagesInStorage) {
        messages = JSON.parse(messagesInStorage);
      }
    } catch (error) {
      console.error('Bad data in localStorage');
    }

    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    yield put(setMessages([newMessage]));
  } catch (error) {
    console.error('can not add message');
  }
}

export function* watchChatActions() {
  yield takeEvery(FETCH_MESSAGES_START, fetchMessagesSaga);
  yield takeEvery(ADD_MESSAGE, addMessageSaga);
}
