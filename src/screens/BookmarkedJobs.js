import React from 'react';
import {connect} from 'react-redux';
import FontText from '../components/FontText';
import {TEXT_PRIMARY} from '../styles/colors';
import JobItemWide from '../components/JobItemWide';
import NoDataSvg from '../assets/images/no_data.svg';
import {Colors, GENERAL_STYLE_SETTING} from '../styles';
import {ScrollView, StyleSheet, View} from 'react-native';
import CustomHeaderPage from '../components/CustomHeaderPage';

/**
 * List of bookmarked jobs
 * @param bookmarkedJobs
 * @param navigation
 * @returns {*}
 * @constructor
 */
const BookmarkedJobs = ({bookmarkedJobs, navigation}) => {
    return (
        <>
            <CustomHeaderPage
                title="Bookmarked Jobs"
                onBackPressed={() => navigation.goBack()}
            />
            <ScrollView style={styles.wrapper}>
                {bookmarkedJobs.length === 0 ? (
                    <View style={{
                        flex: 1,
                        marginTop: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <NoDataSvg
                            width={'100%'}
                            height={200}
                        />
                        <FontText
                            style={{
                                fontSize: 25,
                                marginTop: 10,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: TEXT_PRIMARY,
                            }}
                        >
                            No jobs bookmarked yet
                        </FontText>
                    </View>
                ) : bookmarkedJobs.map((job, index) => (
                    <JobItemWide
                        key={index}
                        // color={index % 2 !== 0 ? 'primary' : 'white'}
                        job={job}
                    />
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.WHITE_LIGHT,
        // backgroundColor: Colors.WHITE,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING,
    }
});

export default connect(({bookmarkedJobs}) => ({bookmarkedJobs}), {})(BookmarkedJobs);
