import { stringCompare } from "./filters.selector.utility";

/**
 * `createFilter`: Creates a lambda to filter out undesired values based on the current filtering values
 * @param {object} filters 
 * @returns {(contact: object) => (boolean)} Method to filter an item based on the given filtering values
 */
const createFilter = ({ categories=[], term='' } = {}) => {
    let filters = [];
    
    if (categories.length > 0) {
        filters = [...filters, (item) => categories.every((category) => item.categories.includes(category))]; // the item has all of the filter categories
    }

    if (term) {
        const regExp = new RegExp(term, 'gi');
        const includes = (haystack) => haystack.search(regExp) >= 0;
        filters = [...filters, (item) => includes(item.name)]; // search for the search term in the title and the note
    }

    return (item) => filters.every(func => func(item));
};

/**
 * `findSort`: Takes in the name of a type of sort and returns its associated lambda, or newest to oldest by default
 * @param {string} sortBy Name of sort method
 * @returns {(c1: object, c2: object) => (number)} Method to sort items in a given way
 */
const findSort = (sortBy = 'byNewest') => {
    switch(sortBy) {
        case "byNewest":            return (c1, c2) => (c2.date - c1.date)
        case "byOldest":            return (c1, c2) => (c1.date - c2.date)
        case "byNameDescending":    return (c1, c2) => (stringCompare(c1.name, c2.name));
        case "byNameAscending":     return (c1, c2) => (stringCompare(c2.name, c1.name))
    }
};

export default (contacts, filters) => (contacts.filter(createFilter(filters)).sort(findSort(filters.sortBy)));