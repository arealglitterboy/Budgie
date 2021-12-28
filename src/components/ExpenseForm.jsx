import React, { useState } from 'react';
import { connect } from 'react-redux';

import ReactDatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

import {Input} from './Input';
import InputCreateSelect from './InputCreateSelect';
import InputMultiSelect from './InputMultiSelect';
import {InputArea} from './InputArea';

import { categoryOptions } from './filter/options';
import { addNewContact } from '../actions/contacts.action';

const isValidAmount = (amount) => (!amount || amount.match(/^(0|[1-9]\d*)(\.\d{0,2})?$/gm));

const findErrors = (title='', contact, date, amount) => ({
    title: !title,
    contact: !(contact && contact.name),
    date: !date,
    amount: !Number.isFinite(amount)
});

// TODO: Finish this
export const ExpenseForm = ({expense={}, ...props}) => {
    const [title, setTitle] = useState(expense.title || '');
    const [contact, setContact] = useState(expense.contact || { id: '', name: '' });
    const [categories, setCategories] = useState(expense.categories || []);
    const [note, setNote] = useState(expense.note || '');
    const [date, setDate] = useState(expense.date ? new Date(expense.date) : new Date());
    const [amount, setAmount] = useState(expense.amount ? (expense.amount/100).toFixed(2) : 0);
    const [error, setError] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();

        setError(findErrors(title, contact, date, amount));

        if (Object.keys(error).length === 0) {
            if (contact.name === contact.id) {
                setContact(props.addContact({ name: contact.name, date: new Date() }).contact);
            }
            props.onSubmit({ contact: contact.id, title, note, categories, date, amount: Math.floor(amount.replace(',', '.') * 100) });
        }
    };

    const DateInput = React.forwardRef(({ value, onClick }, ref) => <Input type="text" label="Date" id="set-date" ref={ref} value={value} onChange={setDate} onClick={onClick} />);

    return (
        <>
            <form action="" onSubmit={onSubmit} className="expense-form">
                <TextareaAutosize className="expense-form__title" id='title' placeholder='Title' onChange={({ target }) => setTitle(target.value)} value={title} />

                <fieldset className="expense-form__date">
                    {error.date && <p className="expense-form__error">Invalid date</p>}
                    <ReactDatePicker
                        selectsStart
                        id="date-picker"
                        className="date-picker expense-form__date__input"
                        dateFormat="dd/MM/yyyy"

                        selected={date}
                        onChange={setDate}
                        customInput={<DateInput />}
                    />
                </fieldset>

                <fieldset className="expense-form__amount">
                    {error.amount && <p className="expense-form__error">Invalid amount</p>}
                    <Input
                        className="expense-form__amount"
                        type="text"
                        id='amount'
                        label="Amount"
                        value={amount}
                        onChange={setAmount}
                        validator={isValidAmount}
                    />
                </fieldset>

                <fieldset className="expense-form__contact">
                    {error.contact && <p className="expense-form__error">Invalid contact</p>}
                    <InputCreateSelect
                        value={{label: contact.name, value: contact.id}}
                        onChange={({value, label}) => setContact({id: value, name: label})}
                        id='contact'
                        label='Contact'
                        options={props.contacts.map(({id, name}) => ({ label: name, value: id }))}
                    />
                </fieldset>

                <fieldset className="expense-form__categories">
                    {error.categories && <p className="expense-form__error">Invalid categories</p>}
                    <InputMultiSelect
                        value={categories.map(category => categoryOptions.find(({value}) => value === category))}
                        className="expense-form__categories"
                        type="text"
                        label="Categories"
                        id='categories'
                        onChange={setCategories}
                        options={categoryOptions}
                    />
                </fieldset>

                <fieldset className="expense-form__note">
                    <InputArea
                        id="note"
                        label="Note"
                        onChange={setNote}
                        placeholder="What were the details"
                        value={note}
                    />
                </fieldset>

                <button className="expense-form__submit" type="submit">Confirm</button>
            </form>
        </>
    );
};

// export class ExpenseForm extends React.Component {
//     state = {
//         title: this.props.expense ? this.props.expense.title : '',
//         contact: this.props.expense ? { id, name } = this.props.expense.contact : { id: undefined, name: undefined },
//         categories: this.props.expense ? this.props.expense.categories : [],
//         note: this.props.expense ? this.props.expense.note : '',
//         date: this.props.expense ? new Date(this.props.expense.date) : new Date(),
//         amount: this.props.expense ? (this.props.expense.amount/100).toFixed(2).toString() : '',
//         error: ''
//     };
    
//     onSubmit = (e) => {
//         e.preventDefault();

//         let error = '';
//         const { contact, title, note, amount, categories, date } = this.state;

//         if (!(title.trim() && amount && (contact && contact.name) && date)) {
//             error= `ERROR: Nice try, you need to fill out all non-optional fields`;
//         } else {
//             if (contact.name === contact.id) {
//                 const newContact = this.props.addContact({ name: contact.name, date: new Date() }).contact;

//                 contact.id = newContact.id;
//                 contact.date = newContact.date;
//             }
//             this.props.onSubmit({ contact: contact.id, title, note, categories, date, amount: Math.floor(amount.replace(',', '.') * 100) });
//         }

//         this.setState(() => ({ error }));
//     }

//     isValidAmount = (amount => !amount || amount.match(/^(0|[1-9]\d*)(\.\d{0,2})?$/gm));

//     onContactChange = ({ value:id='', label:name='' } = {}) => {
//         this.setState(() => ({ contact: { id, name } }));
//     };

//     onTitleChange = (title) => {this.setState(() => ({ title }))};

//     onNoteChange = (note) => {this.setState(() => ({ note }))};

//     onCategoriesChange = (e) => {
//         const categories = e.target.value;
//         this.setState({ categories });
//     };

//     onAmountChange = (amount) => {
//         if (this.isValidAmount(amount)) {
//             this.setState(() => ({ amount }));
//         }
//     };

//     onClickCloseDialog = (e) => {
//         e.preventDefault();
//         this.setState(() => ({ error: '' }));
//     };

//     setDate = (date) => {
//         this.setState(() => ({ date }));
//     }

//     render() {
//         const style='secondary';
//         const DateInput = React.forwardRef(({ value, onClick }, ref) => <Input data-style={style} type="text" label="Date" id="set-date" ref={ref} value={value} onChange={this.setDate} onClick={onClick} />);

//         return (
//             <>
//                 <form action="" onSubmit={this.onSubmit} className="expense-form">

//                     <TextareaAutosize className="expense-form__title" id='title' placeholder='Title' onChange={(e) => this.onTitleChange(e.target.value)} value={this.state.title} />

//                     <fieldset className="expense-form__date">
//                         <ReactDatePicker
//                             selectsStart
//                             id="date-picker"
//                             className="date-picker expense-form__date__input"
//                             dateFormat="dd/MM/yyyy"

//                             selected={this.state.date}
//                             onChange={this.setDate}
//                             customInput={<DateInput />}
//                         />
//                     </fieldset>

//                     <fieldset className="expense-form__amount">
//                         <Input
//                             data-style={style}
//                             className="expense-form__amount"
//                             type="text"
//                             id='amount'
//                             label="Amount"
//                             value={this.state.amount}
//                             onChange={this.onAmountChange}
//                             validator={this.isValidAmount}
//                         />
//                     </fieldset>

//                     <fieldset className="expense-form__contacts">
//                         <InputCreateSelect
//                             value={{label: this.state.contact.name, value: this.state.contact.id}}
//                             onChange={this.onContactChange}
//                             id='contact'
//                             label='Contact'
//                             options={this.props.contacts.map(({id: value, name: label}) => ({ label, value }))}
//                         />
//                     </fieldset>

//                     <fieldset className="expense-form__categories">
//                         <Input
//                             data-style={style}
//                             className="expense-form__categories"
//                             type="text"
//                             label="Categories"
//                             id='categories'
//                             value={this.state.categories.toString()}
//                             onChange={this.onCategoriesChange}
//                         />
//                     </fieldset>

//                     <fieldset className="expense-form__note">
//                         <InputArea data-style={style} id="note" label="Note" onChange={this.onNoteChange} placeholder="What were the details" value={this.state.note} />
//                     </fieldset>

//                     <button className="expense-form__submit" type="submit">Confirm</button>
//                 </form>
//                 {
//                     (this.state.error) &&
//                     <footer className="expense-form__error-box" open>
//                         <h3>Warning!</h3>
//                         <p>{this.state.error}</p>
//                         <button value="cancel" className="expense-form__error-box__close" onClick={this.onClickCloseDialog}>Close</button>
//                     </footer>
//                 }
//             </>
//         );
//     }
// }

const mapDispatchToProps = (dispatch) => ({
    addContact: (contact) => dispatch(addNewContact(contact))
});

const mapStateToProps = connect(({ contacts }) => ({ contacts }), mapDispatchToProps);

export default mapStateToProps(ExpenseForm);