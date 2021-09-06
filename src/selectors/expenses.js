import moment from "moment";

const includesIgnoreCase = (key, searching) => (!key || (searching && searching.toLowerCase().includes(key.toLowerCase())));

/**
 * 
 * @param {string} search 
 * @returns {function}
 */
const createIncludes = (search) => {
    const regExp = new RegExp(search, 'gi')
    return (str) => str.search(regExp) >= 0;
};

function filterExpense({ description, note, date }, term, startDate, endDate) {
    const includes = createIncludes(term);
    const dateMoment = moment(date);

    const containsTerm = includes(description) || includes(note); // ? If either the description or the note contains the search term.
    // const containsTerm = includesIgnoreCase(term, description) || includesIgnoreCase(term, note); // ? If either the description or the note contains the search term.
    const inDate = (!startDate || startDate.isSameOrBefore(dateMoment, 'day')) && (!endDate || endDate.isSameOrAfter(dateMoment, 'day')); // ? If the start/end date is defined, and the given date is greater/less than it.
    return containsTerm && inDate;
}

export default (expenses, { term, startDate, endDate, sortFunction }) => {
    return expenses.filter((e) => (filterExpense(e, term, startDate, endDate))).sort(sortFunction);
};