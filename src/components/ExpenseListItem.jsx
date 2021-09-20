import React from 'react';
import { Link } from 'react-router-dom';

const times = {
    year:   31536000000, //(1000 * 60 * 60 * 24 * 365)
    month:  2419200000,  //(1000 * 60 * 60 * 24 * 7 * 4)
    week:   604800000,   //(1000 * 60 * 60 * 24 * 7)
    day:    86400000,    //(1000 * 60 * 60 * 24)
    // hour:   3600000,     //(1000 * 60 * 60)
    // minute: 60000,       //(1000 * 60)
    // second: 1000,        //(1000)
};

const formatDifference = (time, unit, inPast) => (((!inPast) ? "In " : "") + time + " " + unit + ((time != 1) ? 's' : '') + ((inPast) ? " ago" : ""));

function findDifference(date) {
    let today = Date.now();
    const difference = Math.abs(date - today);
    const key = Object.keys(times).find((time) => (difference >= times[time]));
    return (key) ? (formatDifference(Math.floor(difference/times[key]), key, (date < today))) : "Today";
}

export default class ExpenseListItem extends React.Component {
    // Open up the drop down portion with note and edit button
    // ? Might be easier to use if, when the search is coming up positive due to the string being found in the note, open the note?
    handleClick = (e) => {
        console.log(this);
        console.log(e);
    };
    
    render() {
        const { description, note, date, amount, currency, id} = this.props;
        const time = new Date(date);
        
        return (
            <article className="expense-item" onClick={this.handleClick}>
                <img src="" alt="icon" className="expense-item__icon" />
                
                <section className="expense-item__info">
                    <time className="expense-item__info__date" dateTime={`${time.toUTCString()}`}>{findDifference(date)}</time>
                    <h5 className="expense-item__info__description">{description}</h5> 
                </section>
                
                <data className="expense-item__amount" value={amount}>
                    {(amount/100).toLocaleString('en-US', { style: "currency", currency })}
                </data>
                
                <footer className="expense-item__footer expense-item__footer--inactive">
                    {(note) && <p>{note}</p>}
                    <Link to={`/edit/${id}`} className="expense-item__footer__edit">EDIT</Link>
                </footer>
            </article>
        );
    }
}