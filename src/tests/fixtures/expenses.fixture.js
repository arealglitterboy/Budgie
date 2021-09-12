import moment from "moment";

//#region Utility methods & variables
export const createExpense = (id, description, date, amount, note = '', currency = 'EUR') => ({ id, description, date, amount, note, currency });

export const createState = ({ term = "", startDate = undefined, endDate = undefined, sortBy = "byNewest" } = {}) => ({ term, startDate, endDate, sortBy });

export const expenses = [
    createExpense(1, "Food", moment("2021-04-09"), 1050, "Bought food for mastication"),
    createExpense(2, "Rent", moment("2021-10-12"), 50653, "Alex (landlord), wanted next month early"),
    createExpense(3, "Credit Card", moment("2010-07-16"), 4500, "Paying off loan to completion", "MXN")
];
//#endregion