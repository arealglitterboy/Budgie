import {v4 as uuid} from 'uuid';

/**
 * 
 * @param {object} expense expense details. Optional object properties of description, note, date, currency and amount.
 * @returns @type {expense} returns an expense object.
 */
// Deconstruct the input object, taking only the required properties, and initialising missing properties with default values.
export const addExpense = ({ description = '', note = '', date = 0, currency = '€', amount = 0 } = {}) => (
    {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            date,
            currency,
            amount
        }
    }
);

export const removeExpense = ({ id } = {}) => ({ type: 'REMOVE_EXPENSE', id });

export const editExpense = (id, updates) => ({ type: 'EDIT_EXPENSE', id, updates });