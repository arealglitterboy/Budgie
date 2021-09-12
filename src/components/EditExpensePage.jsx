import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses.action';

export class EditExpensePage extends React.Component {
    onSubmit = (e) => {
        this.props.editExpense(this.props.expense.id, e);
        this.props.history.push('/');
    };

    onRemove = () => {
        this.props.removeExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    };

    render() {
        return (
            <main className="edit">
                <h2 className="edit__title">Edit Expense</h2>
                <button className="edit__button" id="remove" onClick={this.onRemove}>Remove</button>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
            </main>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense(data)),
});

const mapStateToProps = connect((state, props) => ({
    expense: state.expenses.find((e) => (e.id === props.match.params.expenseId))
}), mapDispatchToProps);

export default mapStateToProps(EditExpensePage);