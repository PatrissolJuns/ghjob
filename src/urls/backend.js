import { BACKEND_URL } from '../config';

export const BASE = BACKEND_URL;

export const getOneJobById = (jobId) => {
    return fetch(`${BASE}jobs/${jobId}`)
            .then(response => response.json())
            .then(result => Promise.resolve(result))
            .catch(error => Promise.reject(error));
};

export const getAllJobs = (page = 1) => {
    return fetch(`${BASE}jobs?page=${page}`)
            .then(response => response.json())
            .then(result => Promise.resolve(result.docs))
            .catch(error => Promise.reject(error));
};

export const searchJobs = (search, fullTime, location, page = 1) => {
    let url = `jobs/search?page=${page}`;
    if (search)
        url = url + `&search=${search.replace(' ', '+')}`;
    if (fullTime)
        url = url + `&full_time=true`;
    if (location)
        url = url + `&location=${location.replace(' ', '+')}`;

    return fetch(BASE + url)
            .then(response => response.json())
            .then(result => Promise.resolve(result.docs))
            .catch(error => Promise.reject(error));
};

/**
 * Send to token to the backend server
 * @param token
 * @returns {Promise<any | never>}
 */
export const sendTokenToServer = (token) => {
    return fetch(`${BASE}receive-token?token=${token}`)
            .then(response => response.json())
            .then(result => result && result.status
                ? Promise.resolve(result)
                : Promise.reject(result)
            )
            .catch((error) => Promise.reject(error));
};
