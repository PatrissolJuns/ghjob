import {BOOKMARKED_JOBS, TOGGLE_BOOKMARKED_JOB} from '../types';

export function setBookmarkedJobs(jobsId) {
    return {
        type: BOOKMARKED_JOBS,
        payload: jobsId,
    };
}

export function toggleBookmarkedJob(jobId) {
    return {
        type: TOGGLE_BOOKMARKED_JOB,
        payload: jobId,
    };
}
