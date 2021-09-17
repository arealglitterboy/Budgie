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

const createDateCompare = (date, before = true) => {
    let method = () => true;

    if (date) {
        let control = new Date(date);
        control.setHours(0, 0, 0, 0);
        method = (before) ? ((comp) => comp <= control) : ((comp) => comp >= control);
    }

    return method;
};

function filterExpense(expense, includes, isAfterStart, isBeforeEnd) {
    const containsTerm = includes(expense.description) || includes(expense.note); // ? If either the description or the note contains the search term.
    const inDate = (isAfterStart(expense.date)) && (isBeforeEnd(expense.date)); // ? If the start/end date is defined, and the given date is greater/less than it.
    return containsTerm && inDate;
}

export default (expenses, filters) => {
    const isAfterStart = createDateCompare(filters.startDate, false);
    const isBeforeEnd = createDateCompare(filters.endDate, true);
    const includes = createIncludes(filters.term);

    return expenses.filter(
        ({ description, note, date }) => (
            includes(description + note) && isAfterStart(date) && isBeforeEnd(date)
        )).sort(sort[filters.sortBy]);
    // return expenses.filter((e) => (filterExpense(e, includes, isAfterStart, isBeforeEnd))).sort(sort[sortBy]);
};