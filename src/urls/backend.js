import { BACKEND_URL } from '../config';
import axios from 'axios';

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

export const getAllJobs = (page = 0) => {
    return axios.get(`positions.json?page=${page}`)
        .then(result => {
            return Promise.resolve(result.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};
