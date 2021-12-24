'use strict';
import React from 'react'

import ContactListFilters from './ContactListFilters';
import ContactList from './ContactList';

export const ContactsDirectory = (props) => (
    <main className="contacts-directory">
        <h2>Contacts</h2>
        <ContactListFilters />
        <ContactList />
    </main>
);

export default ContactsDirectory
