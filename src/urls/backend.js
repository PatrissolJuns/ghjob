import axios from 'axios';
import { BACKEND_URL } from '../config';

export const BASE = BACKEND_URL;

export const getOneJobById = (jobId) => {
    return axios.get(`positions/${jobId}.json`)
        .then(result => {
            return Promise.resolve(result.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getAllJobs = (page = 1) => {
    return axios.get(`positions.json?page=${page}`)
        .then(result => {
            return Promise.resolve(result.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const searchJobs = (search, fullTime, location, page = 1) => {
    let url = `positions.json?page=${page}`;
    if (search)
        url = url + `&search=${search.replace(' ', '+')}`;
    if (fullTime)
        url = url + `&full_time=true`;
    if (location)
        url = url + `&location=${location.replace(' ', '+')}`;
    console.log("url => ", url);
    return axios.get(url)
        .then(result => {
            return Promise.resolve(result.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
