import React from 'react';
import ReactDatePicker from 'react-datepicker';

export default class ExpenseForm extends React.Component {
    state = {
        title: this.props.expense ? this.props.expense.title : '',
        note: this.props.expense ? this.props.expense.note : '',
        date: this.props.expense ? new Date(this.props.expense.date) : ((this.props.today) ? new Date(this.props.today) : new Date()),
        category: this.props.expense ? this.props.expense.category :'EUR',
        amount: this.props.expense ? (this.props.expense.amount/100).toFixed(2).toString() : '',
        error: ''
    };
    
    onSubmit = (e) => {
        e.preventDefault();

        let error = '';
        const { title, note, amount, category, date } = this.state;

        if (!(title && amount)) {
            error = `Error, you must provide ${(title) ? 'an amount': (amount) ? ' a title' : 'a title and an amount'}`;
        } else if(!this.isValidAmount(amount)) {
            error = `Error, you must provide a valid amount of money.`;
        } else {
            this.props.onSubmit({ title, note, category, date, amount: Math.floor(amount.replace(',', '.') * 100) });
        }

        this.setState(() => ({ error }));
    }

    isValidAmount = ((amount) => (!amount || amount.match(/^(0|[1-9]\d*)(\.\d{0,2})?$/gm)));

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onCategoryChange = (e) => {
        const category = e.target.value;
        this.setState({ category });
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
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
        return (
            <section>
                <form action="" onSubmit={this.onSubmit} className="expense-form">
                    <fieldset className="expense-form__date expense-form__fieldset">
                        <ReactDatePicker
                            id="date-picker"
                            className="date-picker expense-form__date__input"
                            dateFormat="dd/MM/yyyy"

                            selected={this.state.date}
                            onChange={this.setDate}
                        />
                    </fieldset>

                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" onChange={this.onTitleChange} value={this.state.title} autoFocus />

                    <label htmlFor="note">Note: </label>
                    <textarea id="note" onChange={this.onNoteChange} value={this.state.note}></textarea>

                    <label htmlFor="amount">Amount: </label>
                    <fieldset className="expense-form__fieldset expense-form__amount">
                        <select value={this.state.category} onChange={this.onCategoryChange}>
                            <option value="EUR">€</option>
                            <option value="GBP">£</option>
                            <option value="USD">$</option>
                        </select>
                        <input type="text" id="amount" value={this.state.amount} onChange={this.onAmountChange} />
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