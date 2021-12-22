import React from 'react'
import { connect } from 'react-redux'

import ContactListItem from './ContactListItem';
import selectContacts from '../selectors/contacts.selector';

export const ContactList = ({ contacts=[] }) => (
    <section className="contacts-list">
        {
            (contacts.length === 0) 
            ? <p className="contacts__empty-message">Start by adding</p>
            : contacts.map((contact) => (<ContactListItem {...contact} id={contact.id} name={contact.name} key={contact.id} />))
        }
    </section>
);

const mapStateToProps = connect(({ contacts, contactsFilters }) => ({
    contacts: selectContacts(contacts, contactsFilters)
}));

export default mapStateToProps(ContactList);
