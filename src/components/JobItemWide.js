import React from 'react';
import PropTypes from 'prop-types';
import {JOB} from '../urls/routes';
import BookedJob from './BookedJob';
import FastImage from 'react-native-fast-image';
import { useNavigation } from "@react-navigation/native";
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../styles';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const JobItemWide = ({job, color}) => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate(JOB, {
            job: JSON.stringify(job),
        });
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container]}
            hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
        >
            {/*<View style={{flex: 3}}>*/}
            <View style={styles.imgWrapper}>
                <FastImage
                    source={{
                        uri: job.company.logo,
                        priority: FastImage.priority.high
                    }}
                    style={styles.img}
                />
            </View>

            <View style={styles.wrapper}>
                {/*<View style={{backgroundColor: 'red', flex: 6}}>*/}
                <View style={styles.textWrapper}>
                    <View style={[styles.type]}>
                        <Text style={[styles.title]}>{job.title}</Text>
                    </View>
                    {/*<View style={{flexDirection: 'row', flex: 1}}>*/}
                    <View>
                        <Text style={[styles.textTime]}>
                            {job.company.name} • {job.type}
                        </Text>
                        {/*<Text style={[styles.textTime]}>{job.company.name}</Text>
                        <Text> • </Text>
                        <Text style={[styles.textTime]}>{job.type}</Text>*/}
                    </View>
                </View>

                {/*<View style={{backgroundColor: 'green', flex: 1}}>*/}
                <View>
                    <BookedJob job={job} size={15} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
        paddingVertical: 20,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 0,
        // borderColor: '#A9A9A9',
        flexDirection: 'row',
        alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        // justifyContent: 'space-between',
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_HORIZONTAL,
        /*shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,*/

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        // elevation: 3
    },
    imgWrapper: {
        // backgroundColor: 'blue',
        marginRight: 10
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    img: {
        width: 40,
        height: 40
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textWrapper: {
        // backgroundColor: 'red',
        // textAlign: 'center',
        flex: 0.8,
    },
    title: {
        ...GENERAL_STYLE_SETTING.NORMAL_TEXT_FONT_SIZE,
        marginBottom: 5,
        // maxWidth: '80%',
        textAlign: 'left',
        // backgroundColor: 'red',
        color: Colors.DARK,
        ...Typography.FONT_BOLD,
    },
    textTime: {
        color: Colors.GRAY_DARK,
        ...Typography.FONT_BOLD,
    }
});

JobItemWide.propTypes = {
    color: PropTypes.oneOf(['primary', 'white']).isRequired,
    job: PropTypes.any.isRequired,
};

JobItemWide.defaultProps = {
    color: 'primary',
};

export default JobItemWide;
