import { SET_APP_LOADING } from '../types';

const initialState = true;

const reducer = (state = initialState, action) => {
    if (action.type === SET_APP_LOADING) {
        return action.payload;
    }
    return state;
};

export default reducer;
