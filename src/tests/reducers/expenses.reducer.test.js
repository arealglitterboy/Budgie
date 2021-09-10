import moment from "moment";

import expensesReducer from "../../reducers/expenses.reducer";
import { createExpense, expenses } from "../fixtures/expenses.fixture"; 

//#region Default state testing
test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});
//#endregion

//#region Remove expense
test('should remove an expense by id', () => {
    const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
    const state = expensesReducer(expenses, action);
    expect(state.length).toBe(expenses.length - 1);
    expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should not remove expense if id not found', () => {
    const action = { type: 'REMOVE_EXPENSE', id: -1 };
    const state = expensesReducer(expenses, action);
    expect(state.length).toBe(expenses.length);
    expect(state).toEqual(expenses);
});
//#endregion

//#region Edit expense
test('should edit an expense by id', () => {
    const action = { type: 'EDIT_EXPENSE', id: expenses[1].id, updates: { note: 'HELLO NEW WORLD', date: moment("2021-09-10") } };
    const state = expensesReducer(expenses, action);
    expect(state.length).toBe(expenses.length);
    expect(state[1]).toEqual({ ...expenses[1], ...action.updates  });
});

test('should not edit any expense if id not found', () => {
    const action = { type: 'EDIT_EXPENSE', id: -1 };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should not allow editing of expense id', () => {
    const action = { type: 'EDIT_EXPENSE', id: expenses[1].id, updates: { id: -1 } };
    const state = expensesReducer(expenses, action);
    expect(state[1].id);
    expect(state[1].id).toBe(expenses[1].id);
});
//#endregion

//#region Add expense
test('should add an expense', () => {
    const expense = createExpense(124, 'Hello World', moment("2019-10-24"), 14000);
    const action = { type: 'ADD_EXPENSE', expense: {...expense} };
    const state = expensesReducer(expenses, action);

    expect(state.length).toBe(expenses.length + 1);
    expect(state).toEqual([ ...expenses, expense ]);
});
//#endregion
