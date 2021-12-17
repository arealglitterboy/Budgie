import React from 'react';
import { Link } from 'react-router-dom';

const times = {
    year:   31536000000, //(1000 * 60 * 60 * 24 * 365)
    month:  2419200000,  //(1000 * 60 * 60 * 24 * 7 * 4)
    week:   604800000,   //(1000 * 60 * 60 * 24 * 7)
    day:    86400000,    //(1000 * 60 * 60 * 24)
    hour:   3600000,     //(1000 * 60 * 60)
    minute: 60000,       //(1000 * 60)
    // second: 1000,        //(1000)
};

const formatDifference = (time, unit, inPast) => (((!inPast) ? "In " : "") + time + " " + unit + ((time != 1) ? 's' : '') + ((inPast) ? " ago" : ""));

function findDifference(date, today = Date.now()) {
    const difference = Math.abs(date - today);
    const key = Object.keys(times).find((time) => (difference >= times[time]));
    return (key) ? (formatDifference(Math.floor(difference/times[key]), key, (date < today))) : "Now";
}

export default class ExpenseListItem extends React.Component {
    // Open up the drop down portion with note and edit button
    // ? Might be easier to use if, when the search is coming up positive due to the string being found in the note, open the note?
    handleClick = (e) => {
        console.log(this);
        console.log(e);
    };
    
    render() {
        const { id, participant, title, note, category, date, amount, today } = this.props;
        const time = new Date(date);
        
        return (
            <article className="item" onClick={this.handleClick}>
                <header className="item__header">
                    <time className="item__header__date" dateTime={`${time.toUTCString()}`}>{findDifference(date, today)}</time>
                </header>
                
                <section className="item__body">
                    <img src="" alt="icon" className="item__body__icon" />
                    <h5 className="item__body__title">{title}</h5> 
                    
                    <data className="item__amount" value={amount}>
                        {(amount/100).toLocaleString('en-IE', { style: 'currency', currency: 'EUR' })}
                    </data>
                </section>

                <footer className="expense-item__footer expense-item__footer--inactive">
                    {(note) && <p>{note}</p>}
                    <Link to={`/edit/${id}`} className="expense-item__footer__edit">EDIT</Link>
                </footer>
            </article>
        );
    }
}