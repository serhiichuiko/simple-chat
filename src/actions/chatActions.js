export const ADD_MESSAGE = "ADD_MESSAGE";
export const FETCH_MESSAGES_START = "FETCH_MESSAGES_START";
export const FETCH_MESSAGES_FULFILLED = "FETCH_MESSAGES_FULFILLED";
export const FETCH_MESSAGES_REJECTED = "FETCH_MESSAGES_REJECTED";
export const SET_MESSAGES = "SET_MESSAGES";

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const fetchMessages = () => ({
  type: FETCH_MESSAGES_START,
});

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const fetchMessagesFulfilled = (messages) => ({
  type: FETCH_MESSAGES_FULFILLED,
  payload: messages,
});

export const fetchMessagesRejected = (error) => ({
  type: FETCH_MESSAGES_REJECTED,
  payload: error,
});
