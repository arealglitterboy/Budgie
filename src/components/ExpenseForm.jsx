import React from 'react';

import ReactDatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';
import Select from 'react-select'

import {Input} from './Input';
import InputSelect from './InputSelect';
import {InputArea} from './InputArea';

export default class ExpenseForm extends React.Component {
    state = {
        title: this.props.expense ? this.props.expense.title : '',
        contact: this.props.expense ? this.props.expense.contact : '',
        note: this.props.expense ? this.props.expense.note : '',
        date: this.props.expense ? new Date(this.props.expense.date) : new Date(),
        categories: this.props.expense ? this.props.expense.categories : [],
        amount: this.props.expense ? (this.props.expense.amount/100).toFixed(2).toString() : '',
        error: ''
    };
    
    onSubmit = (e) => {
        e.preventDefault();

        let error = '';
        const { contact, title, note, amount, categories, date } = this.state;

        if (!(title.trim() && amount && contact && date)) {
            error= `ERROR: Nice try, you need to fill out all non-optional fields`;
        } else {
            this.props.onSubmit({ contact, title, note, categories, date, amount: Math.floor(amount.replace(',', '.') * 100) });
        }

        this.setState(() => ({ error }));
    }

    isValidAmount = (amount => !amount || amount.match(/^(0|[1-9]\d*)(\.\d{0,2})?$/gm));

    onContactChange = (contact) => {this.setState(() => ({ contact }))};

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
        const style='secondary';
        const DateInput = React.forwardRef(({ value, onClick }, ref) => <Input data-style={style} type="text" label="Date" id="set-date" ref={ref} value={value} onChange={this.setDate} onClick={onClick} />);

        return (
            <section>
                <form action="" onSubmit={this.onSubmit} className="expense-form">
                    <TextareaAutosize className="expense-form__title" placeholder='Title' onChange={(e) => this.onTitleChange(e.target.value)} value={this.state.title} />

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

                    <fieldset className="expense-form__amount">
                        <Input
                            data-style={style}
                            className="expense-form__amount"
                            type="text"
                            id='amount'
                            label="Amount"
                            value={this.state.amount}
                            onChange={this.onAmountChange}
                            validator={this.isValidAmount}
                        />
                    </fieldset>

                    <fieldset className="expense-form__contacts">
                        <InputSelect
                            value={this.state.contact}
                            onChange={this.onContactChange}
                            id='contact'
                            label='Contact'
                            options={[{label: 'Test', value: 'test'}, {label: 'Test Also a Test', value: 'alsotest'}]}
                        />
                    </fieldset>

                    <fieldset className="expense-form__categories">
                        <Input
                            data-style={style}
                            className="expense-form__categories"
                            type="text"
                            label="Categories"
                            id='categories'
                            value={this.state.categories.toString()}
                            onChange={this.onCategoriesChange}
                        />
                    </fieldset>

                    <fieldset className="expense-form__note">
                        <InputArea data-style={style} id="note" label="Note" onChange={this.onNoteChange} placeholder="What were the details" value={this.state.note} />
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