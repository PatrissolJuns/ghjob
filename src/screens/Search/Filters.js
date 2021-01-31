import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import FontText from '../../components/FontText';
import RadioButton from '../../components/RadioButton';
import PublishedTimeType from '../../enums/PublishedTimeType';
import TextInputComponent from '../../components/TextInputComponent';
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../../styles';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const width = Dimensions.get('window').width;

/**
 * Search Filters
 * @param props
 * @returns {*}
 * @constructor
 */
const Filters = props => {
    const {
        onFilterDone
    } = props;

    const [fullTime, setFullTime] = useState(false);
    const [location, setLocation] = useState("");
    const [publishedAt, setPublishedAt] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.smallBar} />
            <Text style={styles.title}>Set Filters</Text>

            <View style={{marginTop: 30}}>
                <View>
                    <CheckBox
                        iconRight
                        title='Full time'
                        checked={fullTime}
                        activeOpacity={0.9}
                        checkedColor={Colors.PRIMARY}
                        textStyle={styles.checkBoxTextStyle}
                        onPress={() => setFullTime(!fullTime)}
                        containerStyle={styles.checkBoxContainerStyle}
                    />
                </View>

                <View style={{
                    marginTop: 15,
                    marginBottom: 20,
                }}>
                    <Text style={styles.filterLabel}>
                        Location
                    </Text>
                    <TextInputComponent
                        rightIcon
                        theme={'gray'}
                        value={location}
                        rightIconType="entypo"
                        placeholder='Washington'
                        rightIconName="location-pin"
                        containerStyle={styles.locationContainer}
                        onChangeText={text => setLocation(text)}
                    />
                </View>

                <View style={{paddingBottom: 50}}>
                    <Text style={styles.filterLabel}>
                        Published At
                    </Text>
                    <RadioButton
                        containerStyle={{marginLeft: 10}}
                        onChange={selectedOption => setPublishedAt(selectedOption)}
                        defaultSelected={{name: "Last month", value: PublishedTimeType.LAST_MONTH}}
                        options={[
                            {name: "Last 24 hours", value: PublishedTimeType.LAST_24H},
                            {name: "Last week", value: PublishedTimeType.LAST_WEEK},
                            {name: "Last month", value: PublishedTimeType.LAST_MONTH},
                            {name: "Any time", value: PublishedTimeType.ANY_TIME},
                        ]}
                    />
                </View>

            </View>

            <View style={styles.buttonsContainer}>
                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity
                        hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                        // onPress={this.toggleOverlay}
                        onPress={() => onFilterDone({
                            fullTime,
                            location,
                            publishedAt,
                        })}
                        style={[styles.buttonsApply]}
                    >
                        <FontText style={{color: Colors.WHITE, ...Typography.FONT_BOLD}}>
                            Apply filters
                        </FontText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

Filters.propTypes = {
    onFilterDone: PropTypes.func.isRequired,
};

export default Filters;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        position: 'relative',
        // zIndex: 100,
        // backgroundColor: Colors.WHITE_LIGHT,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_HORIZONTAL,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_TOP,
    },
    smallBar: {
        position: 'absolute',
        height: 4,
        width: 40,
        top: 20,
        left: (width / 2) - 20,
        backgroundColor: "#ececf9",
        borderRadius: 50
    },
    title: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 18
    },
    filterLabel: {
        fontWeight: "bold",
        marginBottom: 10
    },
    checkBoxContainerStyle: {
        backgroundColor: Colors.WHITE,
        borderWidth: 0,
        paddingLeft: 0,
        marginLeft: 0,
        marginBottom: 0,
        paddingBottom: 0,
    },
    checkBoxTextStyle: {
        fontWeight: "bold",
        marginBottom: 10,
        color: Colors.BLACK,
        marginLeft: 0,
        paddingRight: 50
    },
    locationContainer: {
        borderRadius: 10,
        backgroundColor: Colors.FORM_BG,
        borderColor: "#bcbcbc",
        borderWidth: 0.5
    },
    buttonsContainer: {
        // backgroundColor: 'red',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    buttonsWrapper: {
        flex: 1,
        paddingVertical: 15,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_HORIZONTAL,
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
    },
    buttonsApply: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        // marginLeft: 10,
        ...GENERAL_STYLE_SETTING.CENTER_HOR_VER,
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.PRIMARY,
        ...GENERAL_STYLE_SETTING.BUTTON_HEIGHT,
    }
});


