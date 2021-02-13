import React from 'react';
import PropTypes from 'prop-types';
import {PROGRAMMING_ICON} from '../../config';
import { Svg, Path, G, LinearGradient, Stop } from 'react-native-svg';

const Flutter = ({width, height}) => {
    return (
        <Svg viewBox="0 0 128 128" width={width} height={height}>
            <G id="Capa_4">
                <G>
                    <G>
                        <Path fill="#3FB6D3" d="M 12.3,64.2 76.3,0 115.7,0 32.1,83.6 z"></Path>
                        <Path fill="#3FB6D3" d="M 76.3,128 115.7,128 81.6,93.9 115.7,59.1 76.3,59.1 42.2,93.5 z"></Path>
                    </G>
                    <Path fill="#27AACD" d="M 81.6,93.9 61.6,73.9 42.2,93.5 61.6,113.1 z"></Path>
                    <Path fill="#19599A" d="M 115.7,128 81.6,93.9 61.6,113.1 76.3,128 z"></Path>
                    <LinearGradient id="SVGID_1_FLUTTER" gradientUnits="userSpaceOnUse" x1="59.3649" y1="116.3598" x2="86.8249" y2="99.3992">
                        <Stop offset="0" style="stop-color:#1B4E94"></Stop>
                        <Stop offset="0.6305" style="stop-color:#1A5497"></Stop>
                        <Stop offset="1" style="stop-color:#195A9B"></Stop>
                    </LinearGradient>
                    <Path fill="url(#SVGID_1_FLUTTER)" d="M 61.6,113.1 92.4,104.7 81.6,93.9 z"></Path>
                </G>
            </G>
        </Svg>
    );
};

Flutter.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};

Flutter.defaultProps = {
    width: PROGRAMMING_ICON.width,
    height: PROGRAMMING_ICON.height,
};

export default Flutter;
