import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses.selector';

const ExpenseList = ({ expenses }) => (
    <section className="expense-list">
        {expenses.map((e) => (<ExpenseListItem { ...e } key={e.id} />))}
    </section>
);

const mapStateToProps = connect(({ expenses, filters }) => ({
    expenses: selectExpenses(expenses, filters)
}));

export default mapStateToProps(ExpenseList);