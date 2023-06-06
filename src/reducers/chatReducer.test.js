import chatReducer from './chatReducer';
import {
  SET_MESSAGES,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_FULFILLED,
  FETCH_MESSAGES_REJECTED,
} from '../actions/chatActions';

describe('chatReducer', () => {
  it('should handle SET_MESSAGES action', () => {
    const initialState = {
      messages: [],
      isLoaded: false,
      error: null,
    };
    const action = {
      type: SET_MESSAGES,
      payload: ['Message 1', 'Message 2'],
    };
    const expectedState = {
      messages: ['Message 1', 'Message 2'],
      isLoaded: false,
      error: null,
    };

    const newState = chatReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_MESSAGES_START action', () => {
    const initialState = {
      messages: [],
      isLoaded: true,
      error: 'Previous error',
    };
    const action = {
      type: FETCH_MESSAGES_START,
    };
    const expectedState = {
      messages: [],
      isLoaded: false,
      error: null,
    };

    const newState = chatReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_MESSAGES_FULFILLED action', () => {
    const initialState = {
      messages: [],
      isLoaded: false,
      error: null,
    };
    const action = {
      type: FETCH_MESSAGES_FULFILLED,
      payload: ['Message 1', 'Message 2'],
    };
    const expectedState = {
      messages: ['Message 1', 'Message 2'],
      isLoaded: true,
      error: null,
    };

    const newState = chatReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_MESSAGES_REJECTED action', () => {
    const initialState = {
      messages: [],
      isLoaded: false,
      error: null,
    };
    const action = {
      type: FETCH_MESSAGES_REJECTED,
      payload: 'Error message',
    };
    const expectedState = {
      messages: [],
      isLoaded: true,
      error: 'Error message',
    };

    const newState = chatReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should return the current state for unknown action types', () => {
    const initialState = {
      messages: ['Message 1', 'Message 2'],
      isLoaded: true,
      error: null,
    };
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: 'Some data',
    };

    const newState = chatReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
