import {BOOKMARKED_JOBS, TOGGLE_BOOKMARKED_JOB} from '../types';
import {setAsyncData} from '../../service/asynsStorage';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKMARKED_JOBS:
            // Save new state
            setAsyncData('bookmarkedJobs', JSON.stringify(action.payload));
            return action.payload;
        case TOGGLE_BOOKMARKED_JOB:
            const jobId = action.payload;
            const newBookmarkedJobs = state.includes(jobId)
                ? state.filter(id => id !== jobId)
                : [...state, jobId];

            // Save new state
            setAsyncData('bookmarkedJobs', JSON.stringify(newBookmarkedJobs));
            return newBookmarkedJobs;
        default:
            return state;
    }
};

export default reducer;
