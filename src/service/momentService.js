import moment from 'moment';

const initMoment = () => {
    moment.updateLocale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s  : 'seconds',
            ss : '%dsec',
            m:  "am",
            mm: "%dm",
            h:  "anh",
            hh: "%dh",
            d:  "ad",
            dd: "%dd",
            w:  "aw ",
            ww: "%dw",
            M:  "amo",
            MM: "%dmo",
            y:  "ay",
            yy: "%dy"
        }
    });
};

export default initMoment;
