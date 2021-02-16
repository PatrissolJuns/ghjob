import React from 'react';
import PropTypes from 'prop-types';
import {PRIMARY} from '../styles/colors';
import {ActivityIndicator} from 'react-native';

const NormalLoader = ({showLoader, loaderSize, loaderColor}) => {
    return (
        <ActivityIndicator
            size={loaderSize}
            color={loaderColor}
            animating={showLoader}
        />
    );
};

NormalLoader.propTypes = {
    showLoader: PropTypes.bool,
    loaderSize: PropTypes.string,
    loaderColor: PropTypes.string,
};

NormalLoader.defaultProps = {
    showLoader: true,
    loaderSize: "large",
    loaderColor: PRIMARY
};

export default NormalLoader;
