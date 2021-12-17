import {v4 as uuid} from 'uuid';

/**
 * Creates an ADD_EXPENSE action with the given details
 * @param {object} expense expense details. Object properties: title, participant id, note, date, category, amount.
 * @returns @type {expense} returns an expense object.
 */
export const addExpense = ({ title, participant, note, date, category, amount } = {}) => (
    {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            participant, // id of person/thing sending/receiving money
            title,
            note,
            date,
            category,
            amount
        }
    }
);

export const removeExpense = ({ id } = {}) => ({ type: 'REMOVE_EXPENSE', id });

export const editExpense = (id, updates) => ({ type: 'EDIT_EXPENSE', id, updates });