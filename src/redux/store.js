import { createStore, applyMiddleware } from 'redux';
import reactThunk from 'redux-thunk';
import rootReducer from './reducers';

export default createStore(rootReducer, applyMiddleware(reactThunk));
