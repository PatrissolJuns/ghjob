import {SET_APP_LOADING} from '../types';

export const setAppLoading = (active) => (dispatch) => {
    dispatch({ type: SET_APP_LOADING, payload: active });
};
