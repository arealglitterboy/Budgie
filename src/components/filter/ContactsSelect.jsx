import React from 'react'

import InputMultiSelect from '../InputMultiSelect';

import { contactToOption } from './options';

export const ContactsSelect = (props) => (
    <InputMultiSelect 
        label="Contacts"
        id="contacts"
        className="contacts-input"
        onChange={props.setContacts}
        value={props.contacts.filter(({id}) => props.selected.includes(id)).map(contactToOption)}
        options={props.contacts.map(contactToOption)}
    />
);

export default ContactsSelect;