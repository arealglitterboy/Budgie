/**
 * `findSort`: Takes in the name of a type of sort and returns its associated lambda function, or newest to oldest by default
 * @param {string} sortBy Name of sort method
 * @returns {(e1: object, e2: object) => (number)} Method to sort items in a given way
 */
function findSort(sortBy) {
    switch(sortBy) {
        case "byTitleAscending": (e1, e2) => (e2.title.localeCompare(e1.title, 'en-IE', {sensitivity: 'base'}))
        case "byTitleDescending": (e1, e2) => (e1.title.localeCompare(e2.title, 'en-IE', {sensitivity: 'base'}))
        case "byAmountAscending": return (e1, e2) => (e1.amount - e2.amount)
        case "byAmountDescending": return (e1, e2) => (e2.amount - e1.amount)
        case "byOldest": return (e1, e2) => (e1.date - e2.date)
        case "byNewest":
        default:
            return (e1, e2) => (e2.date - e1.date)
    }
}

/**
 * `createIncludes`: Creates a method using Regex to search for a static `needle` in a given string (`haystack`) ignoring case.
 * @param {string} needle Search term
 * @returns {(haystack: string) => (boolean)} Method returns true if the haystack includes the needle, false otherwise.
 */
const createIncludes = (needle) => {
    const regExp = new RegExp(needle, 'gi')
    return (haystack) => haystack.search(regExp) >= 0;
};

const createFilter = ({ contacts=[], term = '', categories=[], startDate, endDate } = {}) => {
    let filters = [];

    if (contacts.length > 0) {
        filters = [...filters, (item) => contacts.includes(item.contact)]; // the item's contact is included in the contacts filter
    }
    if (term) {
        const regExp = new RegExp(term, 'gi');
        const includes = (haystack) => haystack.search(regExp) >= 0;
        filters = [...filters, (item) => includes(item.title) || includes(item.note)]; // search for the search term in the title and the note
    }
    if (categories.length > 0) {
        filters = [...filters, (item) => categories.every((category) => item.categories.includes(category))]; // the item has all of the filter categories
    }
    if (startDate) {
        filters = [...filters, (item) => item.date >= startDate];   // the item's date is or is after the start date
    }
    if (endDate) {
        filters = [...filters, (item) => item.date <= endDate];     // the item's date is or is before the end date
    }
    
    return (item) => filters.every(func => func(item));
};

export default (expenses, filters) => (expenses.filter(createFilter(filters)).sort(findSort(filters.sortBy)));