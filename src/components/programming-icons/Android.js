import React from 'react';
import PropTypes from 'prop-types';
import { Svg, Path } from 'react-native-svg';
import {PROGRAMMING_ICON} from '../../config';

const Android = ({width, height}) => {
    return (
        <Svg viewBox="0 0 128 128" width={width} height={height}>
            <Path fill="#fff" d="M21.012 91.125c-5.538.003-10.038-4.503-10.039-10.04l-.002-30.739c-.002-5.532 4.497-10.037 10.028-10.038 2.689-.002 5.207 1.041 7.105 2.937s2.942 4.418 2.944 7.099l-.003 30.74c.007 2.679-1.034 5.199-2.931 7.094-1.892 1.9-4.417 2.946-7.102 2.947M21.004 43.005c-4.053-.002-7.338 3.291-7.339 7.341l.005 30.736c.001 4.064 3.292 7.344 7.341 7.348 4.057-.005 7.343-3.285 7.339-7.347v-30.741c-.002-4.049-3.291-7.339-7.346-7.337"></Path>
            <Path fill="#fff" d="M99.742 44.527l-2.698-.001-66.119.009-2.699.001-.002-2.699c-.006-11.08 6.03-21.385 15.917-27.473l-3.844-7.017c-.47-.822-.588-1.863-.314-2.815.278-.952.935-1.771 1.814-2.239.509-.288 1.131-.448 1.759-.447 1.362 0 2.609.739 3.267 1.933l4.023 7.329c4.163-1.527 8.558-2.306 13.099-2.305 4.606-.002 9.023.777 13.204 2.311l4.017-7.341c.647-1.191 1.903-1.933 3.263-1.932.612-.001 1.223.148 1.761.438.903.495 1.533 1.286 1.81 2.245.276.953.165 1.959-.318 2.832l-3.842 7.013c9.871 6.101 15.9 16.398 15.899 27.459l.003 2.699zM80.196 15.403l5.123-9.355c.273-.489.095-1.115-.399-1.386-.501-.271-1.119-.086-1.384.405l-5.176 9.45c-4.354-1.934-9.229-3.021-14.382-3.016-5.142-.005-10.008 1.078-14.349 3.005l-5.181-9.429c-.267-.497-.891-.679-1.379-.405-.497.266-.68.891-.403 1.379l5.125 9.348c-10.07 5.194-16.874 15.084-16.868 26.439l66.118-.008c.003-11.351-6.789-21.221-16.845-26.427m-31.256 14.457c-1.521-.003-2.763-1.241-2.763-2.771 0-1.523 1.24-2.774 2.766-2.774 1.533-.001 2.773 1.251 2.775 2.774.001 1.528-1.242 2.77-2.778 2.771m30.107-.006c-1.528.002-2.775-1.235-2.772-2.771 0-1.521 1.242-2.772 2.773-2.778 1.521.005 2.768 1.258 2.767 2.779 0 1.531-1.241 2.771-2.768 2.77M51.711 126.159c-5.533-.001-10.036-4.501-10.037-10.038l-.002-13.567-2.638.003c-2.817.001-5.461-1.094-7.448-3.082-1.99-1.986-3.087-4.633-3.083-7.452l-.01-47.627v-2.701h2.699l65.623-.01 2.7-.002v2.699l.007 47.633c.001 5.809-4.725 10.536-10.532 10.535l-2.654.002.003 13.562c0 5.534-4.502 10.039-10.033 10.039-2.681.006-5.197-1.036-7.098-2.937-1.901-1.896-2.948-4.416-2.947-7.096v-13.568h-4.511v13.565c-.002 5.535-4.503 10.043-10.039 10.042"></Path>
            <Path fill="#fff" d="M31.205 92.022c-.004 4.337 3.497 7.838 7.831 7.837h5.333l.006 16.264c-.001 4.05 3.289 7.341 7.335 7.342 4.056 0 7.342-3.295 7.338-7.348l.001-16.259 9.909-.003-.001 16.263c.004 4.051 3.298 7.346 7.343 7.338 4.056.003 7.344-3.292 7.343-7.344l-.005-16.259 5.353-.001c4.319.001 7.832-3.508 7.832-7.837l-.009-47.635-65.621.012.012 47.63zM106.996 91.112c-5.536.001-10.039-4.498-10.038-10.036l-.008-30.738c.002-5.537 4.498-10.041 10.031-10.041 5.54-.001 10.046 4.502 10.045 10.038l.003 30.736c.001 5.534-4.498 10.042-10.033 10.041M106.986 42.996c-4.053-.004-7.337 3.287-7.337 7.342l.003 30.737c.002 4.059 3.286 7.343 7.342 7.34 4.054-.001 7.335-3.281 7.338-7.343l-.008-30.736c-.001-4.056-3.283-7.342-7.338-7.34"></Path>
            <Path fill="#A4C439" d="M21.004 43.005c-4.053-.002-7.338 3.291-7.339 7.341l.005 30.736c.001 4.064 3.288 7.344 7.342 7.343 4.056 0 7.342-3.28 7.338-7.342v-30.741c-.002-4.049-3.291-7.339-7.346-7.337m59.192-27.602l5.123-9.355c.273-.489.094-1.111-.401-1.388-.5-.265-1.117-.085-1.382.407l-5.175 9.453c-4.354-1.938-9.227-3.024-14.383-3.019-5.142-.005-10.013 1.078-14.349 3.005l-5.181-9.429c-.269-.497-.889-.677-1.378-.406-.498.269-.681.892-.404 1.38l5.125 9.349c-10.07 5.193-16.874 15.083-16.868 26.438l66.118-.008c.003-11.351-6.789-21.221-16.845-26.427m-31.256 14.457c-1.521-.003-2.763-1.241-2.763-2.771 0-1.523 1.238-2.775 2.766-2.774 1.533-.001 2.773 1.251 2.775 2.774.001 1.528-1.242 2.77-2.778 2.771m30.107-.006c-1.528.002-2.772-1.237-2.772-2.771.006-1.52 1.242-2.772 2.773-2.778 1.521.005 2.768 1.258 2.767 2.779.002 1.531-1.241 2.771-2.768 2.77m-47.854 14.538l.011 47.635c-.003 4.333 3.502 7.831 7.832 7.831l5.333.002.006 16.264c-.001 4.05 3.291 7.342 7.335 7.342 4.056 0 7.342-3.295 7.343-7.347l-.004-16.26 9.909-.003.004 16.263c0 4.047 3.293 7.346 7.338 7.338 4.056.003 7.344-3.292 7.343-7.344l-.005-16.259 5.352-.004c4.32.002 7.834-3.5 7.836-7.834l-.009-47.635-65.624.011zm83.134 5.943c-.001-4.055-3.286-7.341-7.341-7.339-4.053-.004-7.337 3.287-7.337 7.342l.006 30.738c-.001 4.058 3.283 7.338 7.339 7.339 4.054-.001 7.337-3.281 7.338-7.343l-.005-30.737z"></Path>
        </Svg>
    );
};

Android.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};

Android.defaultProps = {
    width: PROGRAMMING_ICON.width,
    height: PROGRAMMING_ICON.height,
};

export default Android;
