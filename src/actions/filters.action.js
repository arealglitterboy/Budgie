export const setFilterTerm = (term = '') => ({ type: 'SET_FILTER_TERM', term });

export const setSortBy = (sortBy = 'byNewest') => {
    switch(sortBy) {
        case "byNewest": return sortByNewest();
        case "byOldest": return sortByOldest();
        case "byAmountDescending": return sortByAmountDescending();
        case "byAmountAscending": return sortByAmountAscending();
        case "byTitleDescending": return sortByTitleDescending();
        case "byTitleAscending": return sortByTitleAscending();
        default: return sortByNewest();
    }
};

export const sortByNewest = () => ({ type: 'SORT_BY_NEWEST' });

export const sortByOldest = () => ({ type: 'SORT_BY_OLDEST' });

export const sortByAmountDescending = () => ({ type: 'SORT_BY_AMOUNT_DESCENDING' });

export const sortByAmountAscending = () => ({ type: 'SORT_BY_AMOUNT_ASCENDING' });

export const sortByTitleDescending = () => ({ type: 'SORT_BY_TITLE_DESCENDING' });

export const sortByTitleAscending = () => ({ type: 'SORT_BY_TITLE_ASCENDING' });

export const setStartDate = (date) => ({ type: 'SET_START_DATE', date });

export const setEndDate = (date) => ({ type: 'SET_END_DATE', date });