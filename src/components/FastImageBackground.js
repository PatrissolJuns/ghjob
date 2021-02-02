import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
// import FastImage from 'react-native-fast-image';

export default class FastImageBackground extends Component {
	render() {
		const { children, style = {}, imageStyle, imageRef, source, ...props } = this.props;

		const _source = {...source};

		// _source.priority = FastImage.priority.high;

		return (
			<View style={style} ref={this._captureRef}>
				<Image
					{...props}
					source={source}
					style={[
						StyleSheet.absoluteFill,
						{
							width: style.width,
							height: style.height,
						},
						imageStyle,
					]}
				/>
				{children}
			</View>
		)
	}
}

FastImageBackground.propTypes = {
	source: PropTypes.any.isRequired,
};
