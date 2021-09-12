import React from 'react';
import { Link } from 'react-router-dom';

const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

const toIEString = (val, options) => (val.toLocaleString('en-US', options));

export const ExpenseListItem = ({ id, description, note, currency, amount, date }) => {
    const time = new Date(date);
    return (
        <article className="expense-list__item">
            <header className="expense-list__item__header">
                <h4><Link to={`/edit/${id}`} className="hidden-link">{description}</Link></h4>
                {(note) && <aside>{note}</aside>}
            </header>
            
            <div className="expense-list__information">
                <p>Value: 
                    <data value={amount}>
                        {(amount/100).toLocaleString('en-IE', { style: "currency", currency })}
                    </data>
                </p>
                <p>Date: 
                    <time dateTime={`${time.toUTCString()}`}>
                        {time.toLocaleString('en-IE', dateOptions)}
                    </time>
                </p>
            </div>
        </article>
    )
};

export default ExpenseListItem;