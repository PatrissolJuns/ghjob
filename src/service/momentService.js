import moment from 'moment';

const initMoment = () => {
    moment.updateLocale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s  : 'seconds',
            ss : '%dsec',
            m:  "a min",
            mm: "%dm",
            h:  "an h",
            hh: "%dh",
            d:  "a day",
            dd: "%dd",
            w:  "a week ",
            ww: "%dw",
            M:  "a month",
            MM: "%dmo",
            y:  "a year",
            yy: "%dyr"
        }
    });
};

export default initMoment;
