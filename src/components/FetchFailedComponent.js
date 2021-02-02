import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '../styles';
import {Text, View} from 'react-native';

/**
 * Display generic error and retry button when a request failed
 * @param onRetryClick
 * @param errorMessageComponent
 * @returns {*}
 * @constructor
 */
const FetchFailedComponent = ({onRetryClick, errorMessageComponent}) => {
    return (
        <View>
            {errorMessageComponent ? (
                <>
                    {errorMessageComponent(onRetryClick)}
                </>
            ) : (
                <Text>
                    An error occur. <Text style={{...Typography.FONT_BOLD}} onPress={onRetryClick}>Please try again</Text>
                </Text>
            )}
        </View>
    );
};

FetchFailedComponent.propTypes = {
    errorMessageComponent: PropTypes.any,
    onRetryClick: PropTypes.func.isRequired,
};

export default FetchFailedComponent;
