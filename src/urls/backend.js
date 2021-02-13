import { BACKEND_URL } from '../config';

export const BASE = BACKEND_URL;

export const getOneJobById = (jobId) => {
    return fetch(`${BASE}positions/${jobId}.json`)
            .then(response => response.json())
            .then(result => Promise.resolve(result))
            .catch(error => Promise.reject(error));
};

export const getAllJobs = (page = 1) => {
    return fetch(`${BASE}positions.json?page=${page}`)
            .then(response => response.json())
            .then(result => Promise.resolve(result))
            .catch(error => Promise.reject(error));
};

export const searchJobs = (search, fullTime, location, page = 1) => {
    let url = `positions.json?page=${page}`;
    if (search)
        url = url + `&search=${search.replace(' ', '+')}`;
    if (fullTime)
        url = url + `&full_time=true`;
    if (location)
        url = url + `&location=${location.replace(' ', '+')}`;

    return fetch(BASE + url)
            .then(response => response.json())
            .then(result => Promise.resolve(result))
            .catch(error => Promise.reject(error));
};
