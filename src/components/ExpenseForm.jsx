import React from 'react';
import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    state = {
        description: this.props.expense ? this.props.expense.description : '',
        note: this.props.expense ? this.props.expense.note : '',
        date: this.props.expense ? moment(this.props.expense.date) : moment(),
        currency: this.props.expense ? this.props.expense.currency :'EUR',
        amount: this.props.expense ? (this.props.expense.amount/100).toFixed(2).toString() : '',
        calendarFocus: false,
        error: ''
    };
    
    onSubmit = (e) => {
        e.preventDefault();

        let error = '';
        const { description, note, amount, currency, date } = this.state;

        if (!(description && amount)) {
            error = `Error, you must provide ${(description) ? 'an amount': (amount) ? ' a description' : 'a description and an amount'}`;
        } else {
            this.props.onSubmit({ description, note, currency, date, amount: Math.floor(amount.replace(',', '.') * 100) });
        }
        this.setState(() => ({ error }));
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onDateChange = (date) => {
        if (date) {
            this.setState(() => ({ date }));
        }
    };

    onFocusChange = ({ focused: calendarFocus }) => {
        this.setState(() => ({ calendarFocus }));
    };

    onCurrencyChange = (e) => {
        const currency = e.target.value;
        this.setState({ currency });
    };

    amountOnChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^(0|[1-9]\d*)(\.\d{0,2})?$/gm)) {
            this.setState(() => ({ amount }));
        }
    };

    onClickCloseDialog = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: '' }));
    };

    render() {
        return (
            <section>
                <form action="" onSubmit={this.onSubmit} className="expense-form">

                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" onChange={this.onDescriptionChange} value={this.state.description} autoFocus />

                    <label htmlFor="note">Note: </label>
                    <textarea id="note" onChange={this.onNoteChange} value={this.state.note}></textarea>

                    <fieldset className="expense-form__date expense-form__fieldset">
                        <SingleDatePicker
                            date={this.state.date}
                            onDateChange={this.onDateChange}
                            focused={this.state.calendarFocus}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={(day) => (false)}
                        />
                    </fieldset>

                    <label htmlFor="amount">Amount: </label>
                    <fieldset className="expense-form__fieldset expense-form__amount">
                        <select value={this.state.currency} onChange={this.onCurrencyChange}>
                            <option value="EUR">€</option>
                            <option value="GBP">£</option>
                            <option value="USD">$</option>
                        </select>
                        <input type="text" id="amount" value={this.state.amount} onChange={this.amountOnChange} />
                    </fieldset>

                    <button className="expense-form__submit" type="submit">Confirm</button>
                </form>
                {
                    (this.state.error) &&
                    <footer className="expense-form__error-box" open>
                        <h3>Warning!</h3>
                        <p>{this.state.error}</p>
                        <button value="cancel" className="expense-form__error-box__close" onClick={this.onClickCloseDialog}>Close</button>
                    </footer>
                }
            </section>
        );
    }
}