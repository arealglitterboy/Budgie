import moment from "moment";

const sort = {
    byNewest: (e1, e2) => (e2.date - e1.date),
    byOldest: (e1, e2) => (e1.date - e2.date),
    byAmountDescending: (e1, e2) => (e2.amount - e1.amount),
    byAmountAscending: (e1, e2) => (e1.amount - e2.amount),
};

/**
 * `createIncludes`: Creates a method using Regex to search for a static `needle` in a given string (`haystack`) ignoring case.
 * @param {string} needle unchanging search term
 * @returns {(haystack: string) => (boolean)} method returns true if the haystack includes the needle, false otherwise.
 */
const createIncludes = (needle) => {
    const regExp = new RegExp(needle, 'gi')
    return (haystack = "") => haystack.search(regExp) >= 0;
};

function filterExpense(expense, term, startDate, endDate) {
    const includes = createIncludes(term);
    const dateMoment = moment(expense.date);

    const containsTerm = includes(expense.description) || includes(expense.note); // ? If either the description or the note contains the search term.
    const inDate = (!startDate || startDate.isSameOrBefore(dateMoment, 'day')) && (!endDate || endDate.isSameOrAfter(dateMoment, 'day')); // ? If the start/end date is defined, and the given date is greater/less than it.
    return containsTerm && inDate;
}

export default (expenses, { term = "", startDate = undefined, endDate = undefined, sortBy = "byNewest" } = {}) => {
    return expenses.filter((e) => (filterExpense(e, term, startDate, endDate))).sort(sort[sortBy]);
};