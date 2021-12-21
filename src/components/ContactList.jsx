import React from 'react'
import { connect } from 'react-redux'

import ContactListItem from './ContactListItem';
import selectContacts from '../selectors/contacts.selector';

export const ContactList = ({ contacts=[] }) => (
    <>
        <section className="contacts-list">
            {
                (contacts.length === 0) 
                ? <p className="contacts__empty-message">Start by adding</p>
                : contacts.map((contact) => (<ContactListItem {...contact} id={contact.id} name={contact.name} key={contact.id} />))
            }
        </section>

        {/* <section className="contacts-add-contact">
            <article className="contact">
                <img src="images/user-icon.svg" alt="" className="contact__icon" />
                <h5 className="contact__name">+ Add New Contact</h5>
                <p className="contact__date">
                    <time dateTime={new Date()}>{new Date().toLocaleDateString()}</time>
                </p>
                <section className="contact__add-contact">
                    <button className="contact__add-contact__button">create</button>
                </section>
            </article>
        </section> */}
    </>
);

const mapStateToProps = connect(({ contacts, contactsFilters }) => ({
    contacts: selectContacts(contacts, contactsFilters)
}));

export default mapStateToProps(ContactList);
