import {Dimensions, PixelRatio} from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

//Guideline sizes are based on standard ~5" screen mobile device
export const guidelineBaseWidth = 350;
export const guidelineBaseHeight = 680;

export const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = size => size * PixelRatio.getFontScale();

export const scale = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;
export const verticalScale = size => (WINDOW_HEIGHT / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;


function dimensions(top, right = top, bottom = top, left = right, property, suffix = '') {
  const styles = {};

  styles[`${property}Top${suffix}`] = top;
  styles[`${property}Right${suffix}`] = right;
  styles[`${property}Bottom${suffix}`] = bottom;
  styles[`${property}Left${suffix}`] = left;

  return styles;
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function border(top, right, bottom, left, suffix) {
  return dimensions(top, right, bottom, left, 'border', suffix);
}

export function boxShadow(
  color,
  offset = {height: 2, width: 2},
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
