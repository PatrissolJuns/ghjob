import {
    ALL_JOBS,
    ALL_JOBS_SUCCESS,
    ALL_JOBS_FAILURE
} from '../types';
import * as _ from 'lodash';
import Job from '../../models/Job';
import {sortJobs} from '../../service/helper';

const initialState = {
    member: {
        data: [],
        page: 1,
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
                newState.member.data = sortJobs(newData);
                return newState;
            }

            // Merge new data with old one
            let mergedData = [...state.member.data, ...newData];
            // Remove duplicates
            mergedData = _.uniqBy(mergedData, 'id');
            // Sort by created at
            newState.member.data = sortJobs(mergedData);

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

