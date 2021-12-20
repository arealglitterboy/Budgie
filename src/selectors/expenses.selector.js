import { stringCompare } from "./filters.selector.utility";

/**
 * `createFilter`: Creates a lambda 
 * @param {object} filters Expenses filters object
 * @returns {(expense: object) => (boolean)} Method to filter an item based on the given filtering values
 */
const createFilter = ({ contacts=[], term = '', categories=[], startDate, endDate } = {}) => {
    let filters = [];

    if (contacts.length > 0) {
        filters = [...filters, (item) => contacts.includes(item.contact)]; // the item's contact is included in the contacts filter
    }

    if (categories.length > 0) {
        filters = [...filters, (item) => categories.every((category) => item.categories.includes(category))]; // the item has all of the filter categories
    }

    if (term) {
        const regExp = new RegExp(term, 'gi');
        const includes = (haystack) => haystack.search(regExp) >= 0;
        filters = [...filters, (item) => includes(item.title) || includes(item.note)]; // search for the search term in the title and the note
    }

    if (startDate) {
        filters = [...filters, (item) => item.date >= startDate];   // the item's date is or is after the start date
    }
    if (endDate) {
        filters = [...filters, (item) => item.date <= endDate];     // the item's date is or is before the end date
    }
    
    return (item) => filters.every(func => func(item));
};

/**
 * `findSort`: Takes in the name of a type of sort and returns its associated lambda, or newest to oldest by default
 * @param {string} sortBy Name of sort method
 * @returns {(e1: object, e2: object) => (number)} Method to sort items in a given way
 */
function findSort(sortBy) {
    switch(sortBy) {
        case "byNewest":            return (e1, e2) => (e2.date - e1.date)
        case "byOldest":            return (e1, e2) => (e1.date - e2.date)
        case "byAmountDescending":  return (e1, e2) => (e2.amount - e1.amount)
        case "byAmountAscending":   return (e1, e2) => (e1.amount - e2.amount)
        case "byTitleDescending":   return (e1, e2) => (stringCompare(e1.title, e2.title))
        case "byTitleAscending":    return (e1, e2) => (stringCompare(e2.title, e1.title))
    }
}

export default (expenses, filters) => (expenses.filter(createFilter(filters)).sort(findSort(filters.sortBy)));