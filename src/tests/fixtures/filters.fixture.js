const createFilter = (term = '', sortBy = 'byNewest', startDate = undefined, endDate = undefined) => ({
    term,
    sortBy,
    startDate,
    endDate
});

export const createFromDefault = ({ term = '', startDate = undefined, endDate = undefined, sortBy = 'byNewest' } = {}) => ({ term, startDate, endDate, sortBy });

export const filters = createFilter();

export const altFilters = createFilter('bills', 'byAmountDescending', new Date("2021-09-05"), new Date("2021-09-20"));