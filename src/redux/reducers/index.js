import {USER_LOGOUT} from '../types';
import { combineReducers } from 'redux';
import appLoadingReducer from './appLoadingReducer';

// Main reducer
const mainReducer = combineReducers({
    appLoading: appLoadingReducer
});

/**
 * Reducer wrapper to completely empty store while performing log out action
 * @param state
 * @param action
 * @returns {any}
 */
const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined
    }

    return mainReducer(state, action)
};

export default rootReducer;
