import {scaleFont} from './mixins';

// FONT FAMILY
// export const FONT_FAMILY_REGULAR = 'Roboto';
export const FONT_FAMILY_REGULAR = 'normal';
export const FONT_FAMILY_SEMI_BOLD = 'normal';
export const FONT_FAMILY_BOLD = 'normal';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_SEMI_BOLD = '500';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_22 = scaleFont(22);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_10 = scaleFont(10);
export const FONT_SIZE_8 = scaleFont(8);

export const FONT_SIZE_TITLE = scaleFont(25);
export const FONT_SIZE_SUBTITLE = scaleFont(15);
// export const FONT_SIZE_PARAGRAPH = scaleFont(16);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_SEMI_BOLD = {
  fontFamily: FONT_FAMILY_SEMI_BOLD,
  fontWeight: FONT_WEIGHT_SEMI_BOLD,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};
