import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses.action';

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.addExpense(expense);
        this.props.history.push('/');
    };

    render() {
        return (
            <main>
                <h2>Create Expense</h2>
                <ExpenseForm onSubmit={this.onSubmit} />
            </main>
        );    
    }
}

const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
});

const mapStateToProps = connect(undefined, mapDispatchToProps);

export default mapStateToProps(AddExpensePage);