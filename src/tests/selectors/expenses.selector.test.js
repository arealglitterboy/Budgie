import moment from "moment";

import selectExpenses from "../../selectors/expenses.selector";

//#region Utility methods & variables
const createExpense = (id, description, date, amount, note = '', currency = '€') => ({ id, description, date, amount, note, currency });

const createState = ({ term = "", startDate = undefined, endDate = undefined, sortBy = "byNewest" } = {}) => ({ term, startDate, endDate, sortBy });

const expenses = [
    createExpense(1, "Food", moment("2021-04-09"), 1050, "Bought food for mastication"),
    createExpense(2, "Rent", moment("2021-10-12"), 50653, "Alex (landlord), wanted next month early"),
    createExpense(3, "Credit Card", moment("2010-07-16"), 4500, "Paying off loan to completion")
];
//#endregion

//#region Select search term
test('should filter by text value', () => {
    const result = selectExpenses(expenses, createState({ term: 'e' }));
    expect(result).toEqual([ expenses[1], expenses[2] ]);
});

test('should filter by text value from expense description', () => {
    const result = selectExpenses(expenses, createState({ term: 'credit' }));
    expect(result).toEqual([ expenses[2] ]);
});

test('should filter by text value from expense note', () => {
    const result = selectExpenses(expenses, createState({ term: 'alex' }));
    expect(result).toEqual([ expenses[1] ]);
});
//#endregion

//#region Select start date filter
test('should filter by start date', () => {
    const result = selectExpenses(expenses, createState({ startDate: moment("2020-12-08"), sortBy: 'byOldest' }));
    expect(result).toEqual([ expenses[0], expenses[1] ]);
});
//#endregion

//#region Select end date filter
test('should filter by end date', () => {
    const result = selectExpenses(expenses, createState({ endDate: moment("2021-05-15"), sortBy: 'byAmountDescending' }));
    expect(result).toEqual([ expenses[2], expenses[0] ]);
});
//#endregion

//#region Sort expenses
test('should sort expenses by newest first', () => {
    const result = selectExpenses(expenses, createState({ sortBy: 'byNewest' }));
    expect(result).toEqual([ expenses[1], expenses[0], expenses[2] ]);
});

test('should sort expenses by oldest first', () => {
    const result = selectExpenses(expenses, createState({ sortBy: 'byOldest' }));
    expect(result).toEqual([ expenses[2], expenses[0], expenses[1] ]);
});

test('should sort expenses by amount descending, highest to lowest', () => {
    const result = selectExpenses(expenses, createState({ sortBy: 'byAmountDescending' }));
    expect(result).toEqual([ expenses[1], expenses[2], expenses[0] ]);
});

test('should sort expenses by amount ascending, lowest to highest', () => {
    const result = selectExpenses(expenses, createState({ sortBy: 'byAmountAscending' }));
    expect(result).toEqual([ expenses[0], expenses[2], expenses[1] ]);
});
//#endregion