export const setFilterTerm = (term) => ({ type: 'SET_FILTER_TERM', term });

export const sortByNewest = () => ({ type: 'SORT_BY', sortBy: 'byNewest' });

export const sortByOldest = () => ({ type: 'SORT_BY', sortBy: 'byOldest' });

export const sortByAmountDescending = () => ({ type: 'SORT_BY', sortBy: 'byAmountDescending' });

export const sortByAmountAscending = () => ({ type: 'SORT_BY', sortBy: 'byAmountAscending' });

export const setStartDate = (date) => ({ type: 'SET_START_DATE', date });

export const setEndDate = (date) => ({ type: 'SET_END_DATE', date });