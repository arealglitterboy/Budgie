import moment from "moment";

const createFilter = (term = '', sortBy = 'byNewest', startDate = undefined, endDate = undefined) => ({
    term,
    sortBy,
    startDate,
    endDate
});

export const filters = createFilter();

export const altFilters = createFilter('bills', 'byAmountDescending', moment("2021-09-05"), moment("2021-09-20"));