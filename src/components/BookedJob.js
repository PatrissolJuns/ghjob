import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {DARK, PRIMARY} from '../styles/colors';
import {GENERAL_STYLE_SETTING} from '../styles';
import {toggleBookmarkedJob} from '../redux/actions';

const BookedJob = ({job, size, color, bookmarkedJobs, toggleBookmarkedJob}) => {
    const jobId = job.id;

    const isBookmarked = bookmarkedJobs.find(j => j.id === jobId) !== undefined;

    const handleOnPress = () => {
        toggleBookmarkedJob(job);
    };

    return (
        <TouchableOpacity
            onPress={handleOnPress}
            hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
            style={{justifyContent: 'center', alignItems: 'flex-end'}}
        >
            <Icon
                size={size}
                type="antdesign"
                color={isBookmarked ? PRIMARY : color}
                name={isBookmarked ? "heart" : "hearto"}
                // style={{backgroundColor: PRIMARY}}
            />
        </TouchableOpacity>
    );
};

BookedJob.propTypes = {
    job: PropTypes.any.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
};

BookedJob.defaultProps = {
    size: 12,
    color: DARK
};

export default connect(({bookmarkedJobs}) => ({bookmarkedJobs}), {toggleBookmarkedJob})(BookedJob);
