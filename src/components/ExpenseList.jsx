import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses.selector';

export const ExpenseList = ({ expenses = [], contacts = [] }) => (
    <section className="expense-list">
        {
            (expenses.length === 0)
            ? <p className="expense-list__empty-list">Start by adding an expense</p>
            : expenses.map((e) => (<ExpenseListItem { ...e } contactName={contacts.find(val => val.id === e.contact).name} key={e.id} />))
        }
    </section>
);

const mapStateToProps = connect(({ expenses, filters, contacts }) => ({
    expenses: selectExpenses(expenses, filters),
    contacts
}));

export default mapStateToProps(ExpenseList);