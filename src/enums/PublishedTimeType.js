import BaseEnum from './BaseEnum';

export default class PublishedTimeType extends BaseEnum {
    static LAST_24H = 'LAST_24H';
    static LAST_WEEK = 'LAST_WEEK';
    static LAST_MONTH = 'LAST_MONTH';
    static ANY_TIME = 'ANY_TIME';
}
