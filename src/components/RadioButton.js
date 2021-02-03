import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

/**
 * Custom RadioButton Component
 * @param props
 * @returns {*}
 * @constructor
 */
const RadioButton = props => {
    const {
        options,
        onChange,
        selected,
        checkedColor,
        containerStyle,
        defaultSelected,
    } = props;

    const [active, setActive] = useState(defaultSelected ? defaultSelected : options[0]);

    if (selected) {
        useEffect(() => {
            setActive(selected);
        }, [selected]);
    }

    const onOptionPress = (currentOption) => {
        if (currentOption.value !== active.value) {
            setActive(currentOption);
            onChange(currentOption);
        }
    };

    return (
        <View>
            {options.map((option, key) => {
                const isActive = active.value === option.value;

                return (
                    <TouchableOpacity
                        key={key}
                        activeOpacity={0.7}
                        onPress={() => onOptionPress(option)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 5
                        }}
                    >
                        <View
                            style={[
                                {
                                    height: 24,
                                    width: 24,
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: checkedColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 10
                                },
                                containerStyle
                            ]}
                        >
                            {
                                isActive ? (
                                    <View style={{
                                        height: 12,
                                        width: 12,
                                        borderRadius: 6,
                                        backgroundColor: checkedColor,
                                    }}/>
                                ) : null
                            }
                        </View>
                        <Text>{option.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
};

RadioButton.propTypes = {
    onChange: PropTypes.func.isRequired,
    checkedColor: PropTypes.string,
    containerStyle: PropTypes.object,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    defaultSelected: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })
};

RadioButton.defaultProps = {
    containerStyle: {},
    checkedColor: '#FF7764',
};

export default RadioButton;
