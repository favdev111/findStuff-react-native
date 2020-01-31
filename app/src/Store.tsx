import React, {createContext, useReducer} from 'react';

const initialState = {
  token: '',
  user: {},
  news: [],
  notifications: [],
  messages: [],
};
const store = createContext(initialState);
const {Provider} = store;

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'setUser': {
        return {...state, user: action.payload};
      }
      case 'setToken': {
        return {...state, auth_token: action.payload};
      }
      case 'setTokenUser': {
        return {
          ...state,
          ...action.payload,
        };
      }
      case 'setNews': {
        return {...state, news: action.payload};
      }
      case 'addNews': {
        return {...state, news: [...state.news, action.payload]};
      }
      case 'setNotifications': {
        return {...state, notifications: action.payload};
      }
      case 'addNotification': {
        return {
          ...state,
          notifications: [...state.notifications, action.payload],
        };
      }
      case 'setMessages': {
        return {...state, messages: action.payload};
      }
      case 'addMessage': {
        return {...state, messages: [...state.messages, action.payload]};
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

export {store, StateProvider};
