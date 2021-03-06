import React, {useRef} from 'react';
import {StatusBar} from 'react-native';
import {HOME} from '../../urls/routes';
import Swiper from 'react-native-swiper';
import OnBoardingOne from './OnBoardingOne';
import OnBoardingSecond from './OnBoardingSecond';
import {setAsyncData} from '../../service/asynsStorage';

const OnBoarding = (props) => {
    const swiperRef = useRef();

    const onStartedClick = () => {
        swiperRef.current.scrollBy(1);
    };

    const onEndClick = () => {
        props.navigation.navigate(HOME);
        setAsyncData('isNewUser', 'true');
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={"#eaebf2"} animated />
            <Swiper
                ref={swiperRef}
                loop={false}
                showsPagination={false}
                showsButtons={false}
            >
                <OnBoardingOne onClick={onStartedClick} />
                <OnBoardingSecond onClick={onEndClick} />
            </Swiper>
        </>
    );
};

export default OnBoarding;
