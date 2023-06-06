import {
  SET_MESSAGES,
  FETCH_MESSAGES_FULFILLED,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_REJECTED,
} from '../actions/chatActions';

const initialState = {
  messages: [],
  isLoaded: false,
  error: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    case FETCH_MESSAGES_START:
      return {
        ...state,
        isLoaded: false,
        error: null,
      };
    case FETCH_MESSAGES_FULFILLED:
      return {
        ...state,
        messages: action.payload,
        isLoaded: true,
      };
    case FETCH_MESSAGES_REJECTED:
      return {
        ...state,
        messages: [],
        isLoaded: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
