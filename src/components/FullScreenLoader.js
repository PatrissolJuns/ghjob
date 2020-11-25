import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View} from "react-native";
import {PRIMARY, WHITE} from "../styles/colors";
import BlackScreen from '../assets/images/black_image.png';
import WhiteScreen from '../assets/images/white_background.png';
import FastImageBackground from "./FastImageBackground";

const FullScreenLoader = (props) => {
	return (
		<View>
			<FastImageBackground
				source={(props.theme && props.theme === 'white') ? WhiteScreen : BlackScreen}
				style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
			>
				<ActivityIndicator
					animating={true}
					size={"large"}
					color={(props.theme && props.theme === 'white') ? PRIMARY : WHITE}
				/>
			</FastImageBackground>
		</View>
	);
};

FullScreenLoader.propTypes = {
	theme: PropTypes.oneOf(['white']),
};

FullScreenLoader.defaultProps = {
	theme: 'white',
};

export default FullScreenLoader;
