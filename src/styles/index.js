import * as Colors from './colors';
import * as Spacing from './spacing';
import * as Typography from './typography';
import * as Mixins from './mixins';
import {
    SCREEN_PADDING,
} from "../config";

const GENERAL_STYLE_SETTING = {
    SCREEN_PADDING_BOTTOM: {
        paddingBottom: SCREEN_PADDING.BOTTOM,
    },
    SCREEN_PADDING_TOP: {
        paddingTop: SCREEN_PADDING.TOP,
    },
    SCREEN_PADDING_HORIZONTAL: {
        paddingHorizontal: SCREEN_PADDING.HORIZONTAL,
    },
    SCREEN_PADDING: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    SMALL_TEXT_FONT_SIZE: {
        fontSize: 10,
    },
    NORMAL_TEXT_FONT_SIZE: {
        fontSize: 14,
    },
    TITLE_TEXT_FONT_SIZE: {
        fontSize: 18,
    },
    BIG_TITLE_FONT_SIZE: {
        fontSize: 25,
    },
    EXTRA_BIG_TITLE_FONT_SIZE: {
        fontSize: 35,
    },
    BUTTON_HEIGHT: {
        height: 48,
    },
    SMALL_BUTTON_HEIGHT: {
        height: 38,
    },
    BUTTON_PADDING: {
        // paddingVertical: 14,
        paddingTop: 14,
        paddingBottom: 15,
    },
    SMALL_BUTTON_PADDING: {
        // paddingVertical: 14,
        paddingTop: 10,
        paddingBottom: 9,
        paddingLeft: 15,
        paddingRight: 14,
    },
    TEXT_INPUT_HEIGHT: {
        height: 48,
    },
    TEXT_INPUT_FONT_SIZE: {
        fontSize: 14,
    },
    ITEM_SPACING_BOTTOM: {
        marginBottom: 10,
    },
    MIN_CARD_HEIGHT: 186,
    MAX_CARD_HEIGHT: 244.5,
    CENTER_HOR_VER: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    HIT_SLOP: {
        top: 20,
        left: 20,
        bottom: 20,
        right: 20
    }
};

const GLOBAL_HEADER_STYLE = {
    headerStyle: {
        backgroundColor: Colors.DARK,
        elevation: 0,
        shadowOpacity: 0,
    },
    headerTintColor: Colors.WHITE,
    headerTitleStyle: {
        ...Typography.FONT_BOLD,
        color: Colors.DARK,
    },
    subTextAfterTab: {
        // marginTop: 16,
        // marginLeft: 5,
        marginBottom: 10,
        ...GENERAL_STYLE_SETTING.NORMAL_TEXT_FONT_SIZE,
        ...Typography.FONT_REGULAR,
        color: Colors.BLACK,
        opacity: 0.68,
    },
    subTitleAfterTab: {
        margin: 1,
        marginLeft: 5,
        marginBottom: 3,
        ...Typography.FONT_BOLD,
        color: Colors.DARK,
        fontSize: Typography.FONT_SIZE_18,
        opacity: 0.3,
        marginTop: 20
    },
    tabMargin: {
        marginHorizontal: 5,
        marginTop: 3,
    }
};

export {Typography, Spacing, Colors, Mixins, GLOBAL_HEADER_STYLE, GENERAL_STYLE_SETTING};
