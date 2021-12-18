import { addExpense, editExpense, removeExpense } from '../../actions/expenses.action';

// * addExpense
test('should setup add expense action object', () => {
    const expenseData = {
        participant: '12412',
        title: 'Expense Title',
        note: 'Expense note, this is the body of the expense',
        amount: 420,
        categories: ['Expense'],
        date: 1634012412000
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

test('should not setup add expense action as no values are passed', () => {
    const action = addExpense();

    expect(action).toEqual({});
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