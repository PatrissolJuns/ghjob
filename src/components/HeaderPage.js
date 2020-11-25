import React from 'react';
import { Icon } from "react-native-elements";
import {Colors, GENERAL_STYLE_SETTING} from '../styles';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const HeaderPage = ({navigation}) => {
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Icon
                        name='sort-variant'
                        type="material-community"
                        color={Colors.BLACK}
                    />
                </TouchableOpacity>
                <View style={styles.wrapper}>
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                        style={{marginRight: 10}}
                    >
                        <Icon
                            name={"search"}
                            color={Colors.BLACK}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                    >
                        <Icon
                            name={"heart-multiple"}
                            type="material-community"
                            color={Colors.PRIMARY}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

HeaderPage.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        // backgroundColor: Colors.WHITE,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_TOP,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING,
    },
    wrapper: {
        flexDirection: 'row'
    }
});

export default HeaderPage;
