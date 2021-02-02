import {BOOKMARKED_JOBS, TOGGLE_BOOKMARKED_JOB} from '../types';

export function setBookmarkedJobs(jobs) {
    return {
        type: BOOKMARKED_JOBS,
        payload: jobs,
    };
}

export function toggleBookmarkedJob(job) {
    return {
        type: TOGGLE_BOOKMARKED_JOB,
        payload: job,
    };
}
