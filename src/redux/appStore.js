import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { applyMiddleware, compose, createStore } from 'redux';

/**
 * Store of the application
 */
export default createStore(
    rootReducer,
    compose(applyMiddleware(thunk)),
);
