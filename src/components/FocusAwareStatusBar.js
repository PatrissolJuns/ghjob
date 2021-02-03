import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

/**
 * Handle Status Bar change for drawer and tab navigator
 *
 * @param props
 * @returns {null}
 * @constructor
 */
export default function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}
