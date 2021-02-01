import {USER_LOGOUT, ALL_JOBS} from '../types';
import {getAllJobs as _getAllJobs} from '../../urls/backend';

export function logout() {
    return {
        type: USER_LOGOUT,
        payload: {},
    };
}

export const getAllJobs = (page = 0, shouldRefresh = false) => dispatch => {
    const typeBase = 'ALL_JOBS';
    dispatch({ type: `${typeBase}` });
    return _getAllJobs(page)
        .then((response) => {
            if (response) {
                console.log("response.length => ", response.length);
                dispatch({
                    type: `${typeBase}_SUCCESS`,
                    payload: {
                        page,
                        data: response,
                        shouldRefresh: shouldRefresh,
                        canLoadMore: response.length !== 0,
                    }
                });
            } else {
                dispatch({ type: `${typeBase}_FAILURE`, payload: { error: response } });
            }
            return Promise.resolve(response);
        })
        .catch((error) => {
            dispatch({ type: `${typeBase}_FAILURE`, payload: { error } });
            return Promise.reject(error);
        });
};
