import {
    ALL_JOBS,
    ALL_JOBS_SUCCESS,
    ALL_JOBS_FAILURE
} from '../types';
import Job from '../../models/Job';

const initialState = {
    member: {
        data: [],
        page: 0,
        canLoadMore: false,
    },
    error: null,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_JOBS:
            return {...state, loading: true};
        case ALL_JOBS_SUCCESS:
            const newState = {
                error: null,
                loading: false,
                member: {
                    page: action.payload.page,
                    canLoadMore: action.payload.canLoadMore
                }
            };

            const newData = action.payload.data.map(job => new Job(job));

            if (action.payload.shouldRefresh) {
                newState.member.data = newData;
                return newState;
            }

            newState.member.data = [...state.member.data, ...newData];

            return newState;
        case ALL_JOBS_FAILURE:
            return {
                member: {
                    data: null,
                    canLoadMore: false,
                },
                loading: false,
                error: action.payload.error
            };
        default: return state;
    }
};

export default reducer;

