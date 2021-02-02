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
            const jobId = action.payload.id;

            const isBookmarked = state.find(j => j.id === jobId) !== undefined;

            const newBookmarkedJobs = isBookmarked
                ? state.filter(j => j.id !== jobId)
                : [...state, action.payload];

            // Save new state
            setAsyncData('bookmarkedJobs', JSON.stringify(newBookmarkedJobs));
            return newBookmarkedJobs;
        default:
            return state;
    }
};

export default reducer;
