import React from 'react';
import {View} from 'react-native';
import FontText from '../../components/FontText';
import {TEXT_PRIMARY} from '../../styles/colors';
import NotFoundSvg from "../../assets/images/not_found.svg";

const NotFound = () => {
    return (
        <View style={{
            flex: 1,
            marginTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <NotFoundSvg
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
                No jobs found
            </FontText>
        </View>
    );
};

export default NotFound;
