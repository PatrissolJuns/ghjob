import {View} from 'react-native';
import React, {useState} from 'react';
import {PRIMARY} from '../styles/colors';
import {WebView} from 'react-native-webview';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const HowToApply = (props) => {
    const howToApply = props.route.params.howToApply;
    const [textZoom, setTextZoom] = useState(200);

    return (
        <>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor={PRIMARY} animated />
            <View style={{flex: 1}}>
                <WebView
                    originWhitelist={['*']}
                    source={{
                        html: howToApply
                    }}
                    onNavigationStateChange={(navState) => {
                        if (navState.url !== "about:blank" && textZoom === 200) {
                            setTextZoom(100);
                        } else if (navState.url === "about:blank" && textZoom !== 200) {
                            setTextZoom(200);
                        }
                    }}
                    textZoom={textZoom}
                />
            </View>
        </>
    );
};

export default HowToApply;
