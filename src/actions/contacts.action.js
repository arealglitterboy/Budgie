'use strict'
import {v4 as uuid} from 'uuid';

/**
 * Creates an ADD_CONTACT action with the given details
 * @param {object} contact contact details. Object properties: id, name, date, categories
 * @returns @type {contact} returns an contact object
 */
export const addContact = (contact = {}) => {
    return ['id', 'name', 'date'].every((property) => (contact.hasOwnProperty(property))) ? {
        type: 'ADD_CONTACT',
        contact: {
            id: contact.id,
            name: contact.name,
            date: contact.date,
            categories: contact.categories || [],
        }
    } : {};
}

/**
 * Creates an ADD_NEW_CONTACT action with the given details
 * @param {object} contact contact details. Object properties: name, date, categories
 * @returns @type {contact} returns an contact object
 */
export const addNewContact = (contact = {}) => {
    return ['name', 'date'].every((property) => (contact.hasOwnProperty(property))) ? {
        type: 'ADD_CONTACT',
        contact: {
            id: uuid(),
            name: contact.name,
            date: contact.date,
            categories: contact.categories || [],
        }
    } : {};
}

export const removeContact = ({ id } = {}) => ({ type: 'REMOVE_CONTACT', id });

export const editContact = (id, updates) => ({ type: 'EDIT_CONTACT', id, updates });