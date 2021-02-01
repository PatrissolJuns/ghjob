import axios from 'axios';
import * as API from './../urls/backend';

const initAxios = () => {
    return setInterceptors()
        .then(res => Promise.resolve(res))
        .catch(err => Promise.reject(err));
};

const setInterceptors = async () => {
    axios.defaults.baseURL = API.BASE;
};

export default initAxios;
