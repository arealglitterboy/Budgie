import { addExpense, editExpense, removeExpense } from '../../actions/expenses.action';

// * addExpense
test('should setup add expense action object', () => {
    const expenseData = {
        participant: '12412',
        title: 'Expense Title',
        note: 'Expense note, this is the body of the expense',
        amount: 42.0,
        category: ['Expense'],
        date: 1634012412000,
    };

    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

// ! I don't know if this should still exist
test('should setup add expense action with default values', () => {
    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            participant: '',
            title: '',
            note: '',
            date: 0,
            category: [],
            amount: 0
        }
    });
});

// * editExpense
test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { title: 'Deliveroo', note: 'Delivery from McDonald\'s' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            title: 'Deliveroo',
            note: 'Delivery from McDonald\'s'
        }
    });
});

// * removeExpense
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    // ? When testing objects, we want to use toEqual, as toBe will compare references.
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});