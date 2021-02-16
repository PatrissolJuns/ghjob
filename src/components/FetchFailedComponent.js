import React from 'react';
import FontText from './FontText';
import PropTypes from 'prop-types';
import {TEXT_PRIMARY} from '../styles/colors';
import CustomHeaderPage from './CustomHeaderPage';
import NotFoundSvg from '../assets/images/not_found.svg';
import {GENERAL_STYLE_SETTING, Typography} from '../styles';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';

/**
 * Display generic error and retry button when a request failed
 * @param onRetryClick
 * @param errorMessageComponent
 * @param backOnClick
 * @param backText
 * @returns {*}
 * @constructor
 */
const FetchFailedComponent = ({onRetryClick, errorMessageComponent, backOnClick, backText}) => {
    return (
        <ScrollView contentContainerStyle={style.container}>
            {backOnClick && backText && (
                <CustomHeaderPage
                    title={backText}
                    onBackPressed={backOnClick}
                />
            )}
            <View style={style.wrapper}>
                <NotFoundSvg
                    width={'100%'}
                    height={200}
                />
                {errorMessageComponent ? (
                    <>
                        {errorMessageComponent(onRetryClick)}
                    </>
                ) : (
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <FontText style={style.textWrapper}>An error occur.</FontText>
                        <TouchableOpacity
                            onPress={onRetryClick}
                            style={{paddingLeft: 3}}
                            hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                        >
                            <FontText style={[style.textWrapper, style.click]}>Please try again</FontText>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrapper: {
        fontSize: 20,
        // marginTop: 10,
        textAlign: 'center',
        color: TEXT_PRIMARY,
    },
    click: {
        ...Typography.FONT_BOLD,
        // backgroundColor: 'red',
        paddingLeft: 3,
        textDecorationLine: 'underline'
    }
});

FetchFailedComponent.propTypes = {
    backText: PropTypes.string,
    backOnClick: PropTypes.func,
    errorMessageComponent: PropTypes.any,
    onRetryClick: PropTypes.func.isRequired,
};

export default FetchFailedComponent;
