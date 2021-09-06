import React from 'react';
import { Link } from 'react-router-dom';

const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

const toIEString = (val, options) => (val.toLocaleString('en-IE', options));

const getAmount = (amount, currency = 'EUR') => (
    <data value={amount}>
        {toIEString(amount/100, { style: "currency", currency })}
    </data>
);

function getTime(epoch) {
    const date = new Date(epoch);
    return (
        <time dateTime={`${date.toUTCString()}`}>{toIEString(date, dateOptions)}</time>
    );
}

const ExpenseListItem = ({ id, description, note, currency, amount, date }) => (
    <article className="expense-list__item">
        <header className="expense-list__item__header">
            <h4><Link to={`/edit/${id}`} className="hidden-link">{description}</Link></h4>
            {(note) && <aside>{note}</aside>}
        </header>
        
        <div className="expense-list__information">
            <p>Value: {getAmount(amount, currency)}</p>
            <p>Date: {getTime(date)}</p>
        </div>
    </article>
);

export default ExpenseListItem;