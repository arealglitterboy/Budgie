export const setCategories = (categories = []) => ({ type: 'SET_CATEGORIES', categories });

export const setFilterTerm = (term = '') => ({ type: 'SET_FILTER_TERM', term });

export const setSortBy = (sortBy = 'byNewest') => {
    switch(sortBy) {
        case "byNewest":            return sortByNewest();
        case "byOldest":            return sortByOldest();
        case "byNameDescending":   return sortByNameDescending();
        case "byNameAscending":    return sortByNameAscending();
        default:                    return sortByNewest();
    }
};

export const sortByNewest = () => ({ type: 'SORT_BY_NEWEST' });

export const sortByOldest = () => ({ type: 'SORT_BY_OLDEST' });

export const sortByNameDescending = () => ({ type: 'SORT_BY_NAME_DESCENDING' });

export const sortByNameAscending = () => ({ type: 'SORT_BY_NAME_ASCENDING' });