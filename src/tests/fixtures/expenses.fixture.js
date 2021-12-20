//#region Utility methods & variables
/**
 * Sorts the array by ID, allowing for comparison disregarding order of returned object
 * @param {array} arr 
 * @returns 
 */
export const sortByID = (arr) => arr.map(obj => obj.id).sort();

export const createExpense = (id, contact, title, note = '', date, categories = [''], amount) => ({ id, contact, title, note, date, categories, amount });

export const createState = ({ contacts = [], term = "", categories = [], startDate = undefined, endDate = undefined, sortBy = "byNewest" } = {}) => ({ contacts, term, categories, startDate, endDate, sortBy });

export const expenses = [
    createExpense(1, '124', "Food", "Bought food for mastication", new Date("2021-04-09"), ['Food'], 1050),
    createExpense(2, '1642', "Rent", "Alex (landlord), wanted next month early", new Date("2021-10-12"), ['Rent'], 50653, ),
    createExpense(3, '764', "Credit Card", "Paying off loan to completion", new Date("2010-07-16"), ['Debt', 'Credit Card'], 4500),
    createExpense(4, '124', "Food", "Dinner at McDonald's", new Date("2021-05-19"), ['Food'], 1200)
];
//#endregion