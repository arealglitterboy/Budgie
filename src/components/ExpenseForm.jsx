import React from 'react';
import moment from 'moment';

import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.expense);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            date: props.expense ? moment(props.expense.date) : moment(),
            currency: props.expense ? props.expense.currency :'EUR',
            amount: props.expense ? (props.expense.amount/100).toFixed(2).toString() : '',
            calendarFocus: false,
            error: ''
        };
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            const { description, amount } = this.state;  
            this.setState(() => ({ error: `Error, you must provide ${(description) ? 'an amount' : (amount) ? 'a description' : 'a description and an amount'}.` }));
        } else {
            this.setState(() => ({ error: '' }));
            console.log('submit');
            this.props.onSubmit({ 
                description: this.state.description,
                note: this.state.note,
                amount: Math.floor(this.state.amount.replace(',', '.') * 100),
                currency: this.state.currency,
                date: this.state.date.valueOf()
             });
        }
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

    onDayChange = (date) => {
        console.log(date.getTime()/1000);
    };

    onCurrencyChange = (e) => {
        const currency = e.target.value;
        this.setState({ currency });
    };

    selectionInRange = (start, end, length) => (start >= (length - 2) && end >= (length - 2)); 

    textOnInput = (e) => {
        const split = e.target.value.split(/[\.,]/g);

        if (split.length === 1) { // * If there are no decimal points yet
            if (isNaN(e.data) && !((e.data === '.' || e.data === ',') && e.target.value && this.selectionInRange(e.target.selectionStart, e.target.selectionEnd, e.target.value.length))) { // * If the input is not a number that isn't a separator
                e.preventDefault();
            }
        } else if (isNaN(e.data) || (split[1].length >= 2 && this.selectionInRange(e.target.selectionStart, e.target.selectionEnd, e.target.value.length))) {
            e.preventDefault();
        }
    };

    textOnChange = (e) => {
        const amount = e.target.value;
        this.setState({ amount });
    };

    onClickCloseDialog = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: '' }));
    };

    // ? It might be cool to use a div with contentEditable, might look nicer.
    render() {
        return (
            <form action="" onSubmit={this.onSubmit} className="expense-form">
                {
                    (this.state.error) &&
                    <dialog className="add-expense__error-box" id="error-box" open>
                        <h3>Warning!</h3>
                        <p>{this.state.error}</p>
                        <button value="cancel" className="add-expense__error-box__close" onClick={this.onClickCloseDialog}>Close</button>
                    </dialog>
                }
                <div>
                    <label htmlFor="add-expense__description">Description: </label>
                    <input type="text" id="add-expense__description" onChange={this.onDescriptionChange} value={this.state.description} autoFocus />
                </div>


                <div>
                    <label htmlFor="add-expense__note">Note: </label>
                    <textarea id="add-expense__note" onChange={this.onNoteChange} value={this.state.note}></textarea>
                </div>

                <div>
                    <SingleDatePicker 
                        date={this.state.date}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocus}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={(day) => (false)} />
                </div>

                <div>
                    <label htmlFor="add-expense__amount">Amount: </label>
                    <select id="add-expense__currency" value={this.state.currency} onChange={this.onCurrencyChange}>
                        <option value="EUR">€</option>
                        <option value="GBP">£</option>
                        <option value="USD">$</option>
                    </select>
                    <input type="text" id="add-expense__amount" value={this.state.amount} onBeforeInput={this.textOnInput} onChange={this.textOnChange} />
                </div>

                <button id="add-expense__create" type="submit">Confirm</button>
            </form>
        );
    }
}