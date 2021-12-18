import React from 'react';
import ReactDatePicker from 'react-datepicker';

import {Input} from './Input';

export default class ExpenseForm extends React.Component {
    state = {
        title: this.props.expense ? this.props.expense.title : '',
        participant: this.props.expense ? this.props.expense.participant : '',
        note: this.props.expense ? this.props.expense.note : '',
        date: this.props.expense ? new Date(this.props.expense.date) : new Date(),
        categories: this.props.expense ? this.props.expense.categories : [],
        amount: this.props.expense ? (this.props.expense.amount/100).toFixed(2).toString() : '',
        error: ''
    };
    
    onSubmit = (e) => {
        e.preventDefault();

        let error = '';
        const { participant, title, note, amount, categories, date } = this.state;

        if (!(title.trim() && amount && participant && date)) {
            error= `ERROR: Nice try, you need to fill out all non-optional fields`;
        } else {
            this.props.onSubmit({ participant, title, note, categories, date, amount: Math.floor(amount.replace(',', '.') * 100) });
        }

        this.setState(() => ({ error }));
    }

    isValidAmount = (amount => !amount || amount.match(/^(0|[1-9]\d*)(\.\d{0,2})?$/gm));

    onParticipantChange = (participant) => {this.setState(() => ({ participant }))};

    onTitleChange = (title) => {this.setState(() => ({ title }))};

    onNoteChange = (note) => {this.setState(() => ({ note }))};

    onCategoriesChange = (e) => {
        const categories = e.target.value;
        this.setState({ categories });
    };

    onAmountChange = (amount) => {
        if (this.isValidAmount(amount)) {
            this.setState(() => ({ amount }));
        }
    };

    onClickCloseDialog = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: '' }));
    };

    setDate = (date) => {
        this.setState(() => ({ date }));
    }

    render() {
        const DateInput = React.forwardRef(({ value, onClick }, ref) => <Input type="text" label="Date" id="set-date" ref={ref} value={value} onChange={this.setDate} onClick={onClick} />);

        return (
            <section>
                <form action="" onSubmit={this.onSubmit} className="expense-form">
                    <input className="expense-form__title" placeholder='Title' onChange={(e) => this.onTitleChange(e.target.value)} value={this.state.title} />
                    {/* <fieldset>
                        <Input type="text" label="Title" onChange={this.onTitleChange} value={this.state.title} />
                    </fieldset> */}

                    <fieldset className="expense-form__date">
                        <ReactDatePicker
                            selectsStart
                            id="date-picker"
                            className="date-picker expense-form__date__input"
                            dateFormat="dd/MM/yyyy"

                            selected={this.state.date}
                            onChange={this.setDate}
                            customInput={<DateInput />}
                        />
                    </fieldset>

                    <fieldset>
                        <Input type="text" label="Participant" onChange={this.onParticipantChange} value={this.state.participant} />
                    </fieldset>


                    <fieldset>
                        <label htmlFor="note">Note: </label>
                        <textarea id="note" onChange={e => this.onNoteChange(e.currentTarget.value)} value={this.state.note}></textarea>
                    </fieldset>

                    <fieldset>
                        <Input className="expense-form__amount" type="text" label="Amount" value={this.state.amount} onChange={this.onAmountChange} validator={this.isValidAmount} />
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