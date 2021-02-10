import moment from 'moment';

/**
 * Customize english date short version
 */
const initMoment = () => {
    moment.updateLocale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s  : 'seconds',
            ss : '%dsec',
            m:  "A minute",
            mm: "%dm",
            h:  "An hour",
            hh: "%dh",
            d:  "A day",
            dd: "%dd",
            w:  "A week ",
            ww: "%dw",
            M:  "A month",
            MM: "%dmo",
            y:  "A year",
            yy: "%dyr"
        }
    });
};

export default initMoment;
