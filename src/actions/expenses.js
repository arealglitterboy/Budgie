import {v4 as uuid} from 'uuid';

export const addExpense = (
    {
        description = '',
        note = '',
        date = 0,
        currency = '€',
        amount = 0
    } = {}
    ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        date,
        currency,
        amount
    }
});

export const removeExpense = ({ id }) => ({ type: 'REMOVE_EXPENSE', id });

export const editExpense = (id, updates) => ({ type: 'EDIT_EXPENSE', id, updates });