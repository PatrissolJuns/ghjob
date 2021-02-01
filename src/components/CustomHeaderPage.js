import React from 'react';
import PropTypes from 'prop-types';
import FontText from './FontText';
import {Icon} from 'react-native-elements';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../styles';

const CustomHeaderPage = props => {
    const {
        title,
        onBackPressed,
        backgroundColor,
    } = props;

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <TouchableOpacity
                hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                onPress={() => onBackPressed()}
            >
                <Icon
                    type="ionicon"
                    name='arrow-back'
                    color={Colors.TEXT_PRIMARY}
                />
            </TouchableOpacity>
            <FontText style={styles.title}>
                {title}
            </FontText>
            <FontText style={{color: backgroundColor}}>
                Hide.
            </FontText>
        </View>
    );
};

CustomHeaderPage.propTypes = {
    backgroundColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    onBackPressed: PropTypes.func.isRequired,
};

CustomHeaderPage.defaultProps = {
    backgroundColor: Colors.WHITE_LIGHT,
};

const styles = StyleSheet.create({
    container: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       ...GENERAL_STYLE_SETTING.SCREEN_PADDING_HORIZONTAL,
    },
    title: {
        fontSize: 20,
        marginVertical: 20,
        color: Colors.DARK,
        // ...Typography.FONT_BOLD
    }
});

export default CustomHeaderPage;
