import React from 'react';
import { Link } from 'react-router-dom';

const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

export const ExpenseListItem = ({ id, description, note, currency, amount, date }) => {
    const time = new Date(date);
    return (
        <article className="expense-list__item">
            <header className="expense-list__item__header">
                <h4 className="expense-list__item__header__description"><Link to={`/edit/${id}`} className="expense-list__item__header__description--link">{description}</Link></h4> 
                <time className="expense-list__item__header__date" dateTime={`${time.toUTCString()}`}>
                    {time.toLocaleString('en-IE', dateOptions)}
                </time>
            </header>
            
            {(note) && <section className="expense-list__item__note"><p>{note}</p></section>}
            
            <section className="expense-list__item__amount">
                <data value={amount}>
                    {(amount/100).toLocaleString('en-US', { style: "currency", currency })}
                </data>
            </section>
        </article>
    )
};

export default ExpenseListItem;