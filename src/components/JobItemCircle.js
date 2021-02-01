import _ from "lodash";
import React from 'react';
import PropTypes from 'prop-types';
import BookedJob from './BookedJob';
import {tags} from "../service/helper";
import HTML from 'react-native-render-html';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {HOME, JOB} from '../urls/routes';

const tagWhite = tags.reduce((acc, b) => ({...acc, [b]: {color: Colors.WHITE}}), {});
const tagTextSize = tags.reduce((acc, b) => ({...acc, [b]: {fontSize: 16}}), {});
const tagDark = tags.reduce((acc, b) => ({...acc, [b]: {color: Colors.SECONDARY}}), {});


const width = Dimensions.get('window').width;
const itemWidth = width <= 500 ? (2 * (width / 3)) : width / 3;

const JobItemCircle = ({job, color}) => {
    const navigation = useNavigation();

    const tagsColor = color === 'primary' ? tagWhite : tagDark;
    const textColor = color === 'primary' ? {color: Colors.WHITE} : {color: Colors.DARK};
    const bookedColor = color === 'primary' ? {color: Colors.PRIMARY} : {color: Colors.DARK};
    const bgColor = color === 'primary' ? {backgroundColor: Colors.DARK} : {color: Colors.WHITE};

    const onPress = () => {
        navigation.navigate(JOB, {
            jobId: job.id,
        });
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, bgColor]}
            hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
        >
            <View style={styles.imgWrapper}>
                <Image
                    source={{uri: job.company.logo}}
                    style={styles.img}
                />
                <BookedJob jobId={job.id} size={15} color={Object.values(bookedColor)[0]} />
            </View>
            <View>
                <Text
                    // numberOfLines={1}
                    style={[styles.title, textColor]}
                >
                    {job.title}
                </Text>
            </View>
            <View style={styles.descriptionWrapper}>
                <Text
                    numberOfLines={1}
                    style={[styles.description, textColor]}>
                    {_.capitalize(job.descNoTags)}
                </Text>
                {/*<HTML
                    // html={job.description}
                    html={job.descNoTags}
                    // tagsStyles={{...tagsColor, ...tagTextSize}}
                    tagsStyles={{...tagsColor}}
                    contentWidth={width}
                    imagesMaxWidth={width}
                />*/}
            </View>
            <View style={styles.footer}>
                <View style={[styles.type, color === 'primary' ? {} : {backgroundColor: '#f3f3f3'}]}>
                    <Text style={[styles.typeText, textColor]}>{job.type}</Text>
                </View>
                <View>
                    <Text style={[styles.textTime, textColor]}>{job.createdAt.fromNow()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
        padding: 20,
        paddingVertical: 20,
        borderRadius: 20,
        // backgroundColor: 'gray',
        marginRight: 15,
        width: itemWidth,
        // borderWidth: 0.4,
        // borderColor: '#A9A9A9',
    },
    imgWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    img: {
        width: 40,
        height: 40,
        backgroundColor: Colors.WHITE
    },
    titleWrapper: {
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        ...GENERAL_STYLE_SETTING.NORMAL_TEXT_FONT_SIZE,
        marginVertical: 8,
        maxWidth: '80%',
        textAlign: 'left',
        // backgroundColor: 'red',
        color: Colors.DARK,
        ...Typography.FONT_BOLD,
    },
    type: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderLeftColor: Colors.PRIMARY,
        backgroundColor: "#ff77659c",
        alignSelf: 'flex-start',
        ...Typography.FONT_BOLD,
    },
    typeText: {
        color: Colors.DARK,
        fontSize: 12,
    },
    descriptionWrapper: {
        flex: 1,
        // height: 35,
        marginBottom: 10,
        overflow: 'hidden',
        fontSize: 12,
    },
    description: {
        fontSize: 10,
        maxWidth: '80%',
        // color: Colors.WHITE,
        ...Typography.FONT_REGULAR,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        justifyContent: 'space-between'
    },
    textTime: {
        color: Colors.GRAY_DARK,
        ...Typography.FONT_BOLD,
    }
});

JobItemCircle.propTypes = {
    color: PropTypes.oneOf(['primary', 'white']).isRequired,
    job: PropTypes.any.isRequired,
};

JobItemCircle.defaultProps = {
    color: 'primary',
};

export default JobItemCircle;
