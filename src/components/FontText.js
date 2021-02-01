import React from 'react';
import {Text} from 'react-native';
import {Typography} from '../styles';

const FontText = ({style, ...restProps}) => {
    const _style = style
        ? Array.isArray(style)
            ? {...Typography.FONT_REGULAR, ...style.reduce((acc, b) => ({...acc, ...b}), {})}
            : {...Typography.FONT_REGULAR, ...style}
        : {...Typography.FONT_REGULAR};
    return (
        <Text
            style={_style}
            {...restProps}
        />
    );
};

export default FontText;
