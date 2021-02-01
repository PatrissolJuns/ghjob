import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {GENERAL_STYLE_SETTING} from '../styles';
import {DARK, PRIMARY} from '../styles/colors';
import {connect} from 'react-redux';
import {toggleBookmarkedJob} from '../redux/actions';

const BookedJob = ({jobId, size, color, bookmarkedJobs, toggleBookmarkedJob}) => {
    // console.log("bookmarkedJobs => ", bookmarkedJobs);
    const isBookmarked = bookmarkedJobs.includes(jobId);

    const handleOnPress = () => {
        console.log("jobId => ", jobId, " bookmarkedJobs => ", bookmarkedJobs);
        toggleBookmarkedJob(jobId);
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
    jobId: PropTypes.any.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
};

BookedJob.defaultProps = {
    jobId: '1',
    size: 12,
    color: DARK
};

export default connect(({bookmarkedJobs}) => ({bookmarkedJobs}), {toggleBookmarkedJob})(BookedJob);
