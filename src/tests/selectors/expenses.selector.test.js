import selectExpenses from "../../selectors/expenses.selector";
import { sortByID, createState, expenses } from "../fixtures/expenses.fixture";

//#region Select search term
test('should filter by text value', () => {
    const result = selectExpenses(expenses, createState({ term: "e" }));
    const expected = [expenses[1], expenses[3], expenses[2]];

    expect(sortByID(result)).toEqual(sortByID(expected));
});

test('should filter by text value from expense title', () => {
    const result = selectExpenses(expenses, createState({ term: 'credit' }));
    const expected = [expenses[2]];

    expect(sortByID(result)).toEqual(sortByID(expected));
});

test('should filter by text value from expense note', () => {
    const result = selectExpenses(expenses, createState({ term: 'alex' }));
    const expected = [expenses[1]];

    expect(sortByID(result)).toEqual(sortByID(expected));
});
//#endregion

//#region Select categories
test('should filter by existing category value', () => {
    const result = selectExpenses(expenses, createState({ categories: ["Food"] }));
    const expected = [expenses[0], expenses[3]];

    expect(sortByID(result)).toEqual(sortByID(expected));
});

test('should filter by non-existing category value', () => {
    const result = selectExpenses(expenses, createState({ categories: ["Night Out"] }));

    expect(result).toHaveLength(0);
});
//#endregion

//#region Select categories
test('should filter by contact id where contact has more than one entry', () => {
    const result = selectExpenses(expenses, createState({ contacts: ['124'] }));
    const expected = [expenses[0], expenses[3]];

    expect(sortByID(result)).toEqual(sortByID(expected));
});

test('should filter by contact id where contact has one entry', () => {
    const result = selectExpenses(expenses, createState({ contacts: ['764'] }));
    const expected = [expenses[2]];

    expect(sortByID(result)).toEqual(sortByID(expected));
});

test('should filter by non-existing category value', () => {
    const result = selectExpenses(expenses, createState({ contacts: ['0'] }));

    expect(result).toHaveLength(0);
});
//#endregion

//#region Select start date filter
test('should filter by start date', () => {
    const result = selectExpenses(expenses, createState({ startDate: new Date("2020-12-08"), sortBy: 'byOldest' }));
    const expected = [expenses[0], expenses[3], expenses[1]];

    expect(sortByID(result)).toEqual(sortByID(expected));
});
//#endregion

//#region Select end date filter
test('should filter by end date', () => {
    const result = selectExpenses(expenses, createState({ endDate: new Date("2021-05-15"), sortBy: 'byAmountDescending' }));
    const expected = [expenses[0], expenses[2]];

    expect(sortByID(result)).toEqual(sortByID(expected));
});
//#endregion

//#region Sort expenses
test('should sort expenses by newest first', () => {
    const result = selectExpenses(expenses, createState({ sortBy: 'byNewest' }));

    expect(result.length).toBe(4);
    expect(result).toEqual([ expenses[1], expenses[3], expenses[0], expenses[2] ]);
});

test('should sort expenses by oldest first', () => {
    const result = selectExpenses(expenses, createState({ sortBy: 'byOldest' }));

    expect(result.length).toBe(4);
    expect(result).toEqual([ expenses[2], expenses[0], expenses[3], expenses[1] ]);
});

test('should sort expenses by amount descending, highest to lowest', () => {
    const result = selectExpenses(expenses, createState({ sortBy: 'byAmountDescending' }));

    expect(result.length).toBe(4);
    expect(result).toEqual([ expenses[1], expenses[2], expenses[3], expenses[0] ]);
});

test('should sort expenses by amount ascending, lowest to highest', () => {
    const result = selectExpenses(expenses, createState({ sortBy: 'byAmountAscending' }));

    expect(result.length).toBe(4);
    expect(result).toEqual([ expenses[0], expenses[3], expenses[2], expenses[1] ]);
});

test('should sort expenses by title descending, A to Z', () => {
    const result = selectExpenses(expenses, createState({ sortBy: 'byTitleDescending' }));

    expect(result.length).toBe(4);
    expect(result).toEqual([ expenses[2], expenses[0], expenses[3], expenses[1] ]);
});

test('should sort expenses by title ascending, Z to A', () => {
    const result = selectExpenses(expenses, createState({ sortBy: 'byTitleAscending' }));

    expect(result.length).toBe(4);
    expect(result).toEqual([ expenses[1], expenses[0], expenses[3], expenses[2] ]);
});
//#endregion