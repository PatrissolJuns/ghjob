import moment from 'moment';
import {removeTags} from '../service/helper';

export default class Job {
    constructor(job) {
        this.id = job.id;
        this.type = job.type;
        this.url = job.url;
        this.company = {
            name: job.company,
            url: job.company_url,
            logo: job.company_logo,
        };
        this.title = job.title;
        this.location = job.location;
        this.description = job.description;
        this.descNoTags = removeTags(job.description);
        this.howToApply = job.how_to_apply;
        this.createdAt = moment(new Date(job.created_at));
    }
}
