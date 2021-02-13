import React from 'react';
import PropTypes from 'prop-types';
import { Svg, Path } from 'react-native-svg';
import {PROGRAMMING_ICON} from '../../config';

const Haskell = ({width, height}) => {
    return (
        <Svg viewBox="0 0 128 128" width={width} height={height}>
            <Path fill="#463B63" d="M0,110.2L30.1,65L0,19.9h22.6L52.7,65l-30.1,45.1H0z"></Path>
            <Path fill="#5E5187" d="M30.1,110.2L60.2,65L30.1,19.9h22.6l60.2,90.3H90.4L71.5,81.9l-18.8,28.2H30.1z"></Path>
            <Path fill="#904F8C" d="m102.9 83.8-10-15.1h35.1v15.1h-25.1zm-15.1-22.5-10-15.1h50.2v15.1h-40.2z"></Path>
        </Svg>
    );
};

Haskell.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};

Haskell.defaultProps = {
    width: PROGRAMMING_ICON.width,
    height: PROGRAMMING_ICON.height,
};

export default Haskell;
