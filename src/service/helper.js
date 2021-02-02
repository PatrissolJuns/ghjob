export const tags = ['a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'span', 'i', 'ul', 'li'];

/**
 * Remove tags in a string
 * @param text
 * @returns {*}
 */
export const removeTags = (text) => {
    // First matcher
    const regex =  /(<([^>]+)>)/ig;
    // Second matcher
    const regex2 = /(&nbsp;|<([^>]+)>)/ig;
    // Apply first regex
    const filtered = text.replace(regex, "");
    // Apply last regex
    return filtered.replace(regex2, "");
};

export const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
};

export const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    return contentOffset.y == 0;
};

export const sortJobs = (jobs) => {
    return jobs.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf());
};
