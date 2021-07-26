import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import { storeName } from '../config';
import { rootReducer } from './rootReducer';

const saveToLocalStorage = (state) => {
    try {      
      localStorage.setItem(storeName, JSON.stringify({...state.user}));
    } catch (e) {
      console.error(e);
    }
  };
  
  const loadFromLocalStorage = () => {
    try {
      const stateStr = localStorage.getItem(storeName);      
      const newState = JSON.parse(stateStr);
      return stateStr ? {user:newState} : undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };


const persistedStore = loadFromLocalStorage();
const store = createStore(rootReducer, persistedStore,compose(
    
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

store.subscribe(() => {
    saveToLocalStorage(store.getState());
  });

export default store;
