import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses.action';

const CreatePage = (props) => {
    const onSubmit = (expense) => {
        props.dispatch(addExpense(expense));
        props.history.push('/');
    };

    return (
        <main>
            <h2>Create Expense</h2>
            <ExpenseForm onSubmit={onSubmit} />
        </main>
    );
};

const mapStateToProps = connect();

export default mapStateToProps(CreatePage);