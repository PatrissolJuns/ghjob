import React, { Component } from 'react';
import {ScrollView, Dimensions, StyleSheet, Text} from 'react-native';
import {GENERAL_STYLE_SETTING} from '../styles';

export default class AboutScreen extends Component {
    render () {
        return (
            <>
                <Text>About GhJob</Text>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING,
    }
});
