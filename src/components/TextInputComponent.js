import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from "react-native-elements";
import {FONT_BOLD} from "../styles/typography";
import {GENERAL_STYLE_SETTING} from "../styles";
import {StyleSheet, TextInput, View} from "react-native";
import {BLACK, TEXT_INPUT_COLOR, TEXT_INPUT_COLOR_GRAY, WHITE} from "../styles/colors";

const styles = StyleSheet.create({
	containerStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: TEXT_INPUT_COLOR,
		borderWidth: 0,
		borderRadius: 50,
		...GENERAL_STYLE_SETTING.TEXT_INPUT_HEIGHT,
		paddingRight: 20,
	},
	inputStyle: {
		flex: 1,
		// fontSize: 14,
		paddingHorizontal: 20,
		...FONT_BOLD,
		...GENERAL_STYLE_SETTING.TEXT_INPUT_FONT_SIZE,
		...GENERAL_STYLE_SETTING.BUTTON_HEIGHT,
		...GENERAL_STYLE_SETTING.BUTTON_PADDING,
	}
});

const TextInputComponent = props => {
	const {
		containerStyle,
		inputContainerStyle,
		inputStyle,
		refInstance,
		rightIcon,
		rightIconType,
		rightIconName,
		rightIconOnPress,
		theme,
		...restProps
	} = props;

	const innerContainerStyle = [styles.containerStyle];
	const innerInputStyle = [styles.inputStyle];
	let defaultPlaceholderTextColor = null,
		backgroundColor = null,
		color = null,
		iconColor = null;

	switch (theme) {
		case 'dark':
			color = WHITE;
			iconColor = 'rgba(255,255,255,0.3)';
			backgroundColor = TEXT_INPUT_COLOR;
			defaultPlaceholderTextColor = 'rgba(255,255,255,0.3)';
			break;
		case 'gray':
			color = BLACK;
			iconColor = BLACK;
			backgroundColor = TEXT_INPUT_COLOR_GRAY;
			defaultPlaceholderTextColor = '#909090';
			break;
	}

	innerContainerStyle.push(
		{backgroundColor: backgroundColor},
		containerStyle
	);
	innerInputStyle.push(
		{color: color},
		inputStyle
	);

	return (
		<View style={innerContainerStyle}>
			<TextInput
				ref={refInstance}
				style={innerInputStyle}
				placeholderTextColor={defaultPlaceholderTextColor}
				{...restProps}
			/>
			{rightIcon && (
				<Icon
					size={22}
					color={iconColor}
					name={rightIconName}
					type={rightIconType}
					onPress={() => rightIconOnPress ? rightIconOnPress() : null}
				/>
			)}
		</View>
	);
};

TextInputComponent.propTypes = {
	containerStyle: PropTypes.object,
	inputContainerStyle: PropTypes.object,
	inputStyle: PropTypes.object,
	placeholderTextColor: PropTypes.string,
	refInstance: PropTypes.any,
	theme: PropTypes.string,
	rightIcon: PropTypes.bool,
	rightIconType: PropTypes.string,
	rightIconName: PropTypes.string,
	rightIconOnPress: PropTypes.func,
};

TextInputComponent.defaultProps = {
	theme: 'dark',
	rightIcon: false,
	rightIconType: 'material-community',
};

export default TextInputComponent;
