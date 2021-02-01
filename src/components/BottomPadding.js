import React from 'react';
import PropTypes from 'prop-types';
import {SCREEN_PADDING} from "../config";
import {ActivityIndicator, View} from "react-native";
import {PRIMARY} from "../styles/colors";

const BottomPadding = props => {
	const {
		height,
		showLoader,
		loaderSize,
		loaderColor,
		backgroundColor,
		...restProps
	} = props;

	const innerHeight = height
		? height
		: showLoader
			? 10 + SCREEN_PADDING.BOTTOM * 3
			: 10 + SCREEN_PADDING.BOTTOM * 3;

	return (
		<>
			<View
				style={{
					height: innerHeight,
					justifyContent: 'flex-start',
					alignItems: 'center',
					backgroundColor: backgroundColor,
				}}
			>
				<ActivityIndicator
					animating={showLoader}
					size={loaderSize ? loaderSize : "large"}
					color={loaderColor ? loaderColor : PRIMARY}
				/>
			</View>
		</>
	);
};

BottomPadding.propTypes = {
	height: PropTypes.number,
	showLoader: PropTypes.bool,
	loaderSize: PropTypes.number,
	loaderColor: PropTypes.string,
	backgroundColor: PropTypes.string,
};

BottomPadding.defaultProps = {
	backgroundColor: 'white',
};

export default BottomPadding;
