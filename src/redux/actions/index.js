import {USER_LOGOUT} from '../types';

export function logout() {
    return {
        type: USER_LOGOUT,
        payload: {},
    };
}
