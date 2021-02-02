import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../styles';

const PlText = ({id, name, component: LangComp, onPress}) => {
    return (
        <TouchableOpacity
            // key={id}
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.plIconWrapper}
        >
            <View style={styles.plIcon}>
                {LangComp}
            </View>
            <Text style={styles.plIconText}>
                {name}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    plIconWrapper: {
        marginRight: 20,
    },
    plIcon: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        marginBottom: 5,
        ...GENERAL_STYLE_SETTING.CENTER_HOR_VER
    },
    plIconText: {
        ...GENERAL_STYLE_SETTING.NORMAL_TEXT_FONT_SIZE,
        ...Typography.FONT_BOLD,
        textAlign: 'center',
        color: Colors.DARK
    }
});

PlText.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired,
    onPress: PropTypes.func,
};

export default PlText;
