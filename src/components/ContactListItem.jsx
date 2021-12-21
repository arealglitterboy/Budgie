import React from 'react'

const imgOnError = (e) => {
    e.target.src = `data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 0 24 24' width='48px' %3e%3cpath d='M0 0h24v24H0V0z' fill='none' /%3e%3cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' /%3e%3c/svg%3e`;
    e.target.classList.add('contact__icon__image--default');
    e.target.onError = () => {};
};

const buttonOnFocus = (e) => {
    console.log();
    e.target.nextSibling.classList.add('contact__categories__list--active')
};

const buttonOnBlur = (e) => {
    e.target.nextSibling.classList.remove('contact__categories__list--active')
}

export default (props) => (
    <article className="contact" id={props.id}>
        <div className="contact__icon">
            <img src={props.icon || ''} alt="" className="contact__icon__image" onError={imgOnError} />
        </div>
        <h5 className="contact__name">{props.name}</h5>
        <p className="contact__date">
            <time dateTime={props.date}>{props.date.toLocaleDateString()}</time>
        </p>
        <section className="contact__categories">
            <button className="contact__categories__button" onFocus={buttonOnFocus} onBlur={buttonOnBlur}>view</button>
            <ul className="contact__categories__list">
                {props.categories.map((val, i) => <li key={i} className="contact__categories__list__item">{val}</li>)}
            </ul>
        </section>
    </article>
)