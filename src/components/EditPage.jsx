import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses.action';

const EditPage = ({ expense, dispatch, history }) => {
    const onSubmit = (e) => {
        dispatch(editExpense(expense.id, e));
        history.push('/');
    };

    const onRemove = () => {
        dispatch(removeExpense({ id: expense.id }));
        history.push('/');
    };

    return (
        <section>
            <h2>Edit Expense</h2>
            <button onClick={onRemove}>Remove</button>

            <ExpenseForm
                expense={expense}
                onSubmit={onSubmit}
            />
        </section>
    );
};

const mapStateToProps = connect((state, props) => ({
    expense: state.expenses.find((e) => (e.id === props.match.params.expenseId))
}));

export default mapStateToProps(EditPage);