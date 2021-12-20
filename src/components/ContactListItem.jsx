import React from 'react'

export default (props) => (
    <article className="contact" id={props.id}>
        <img src="" alt="" className="contact__icon" />
        <h5 className="contact__name">{props.name}</h5>
        <ul>
            {props.categories.map((val, i) => <li key={i}>{val}</li>)}
        </ul>
    </article>
)