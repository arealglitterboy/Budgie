'use strict'
import {v4 as uuid} from 'uuid';

/**
 * Creates an ADD_EXPENSE action with the given details
 * @param {object} expense expense details. Object properties: title, contact id, note, date, categories, amount.
 * @returns @type {expense} returns an expense object.
 */
export const addExpense = (expense = {}) => {
    return ['contact', 'title', 'amount'].every((property) => (expense.hasOwnProperty(property))) ? {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            contact: expense.contact, // id of person/thing sending/receiving money
            title: expense.title,
            note: expense.note,
            date: expense.date,
            categories: expense.categories,
            amount: expense.amount
        }
    } : {};
}
export const removeExpense = ({ id } = {}) => ({ type: 'REMOVE_EXPENSE', id });

export const editExpense = (id, updates) => ({ type: 'EDIT_EXPENSE', id, updates });