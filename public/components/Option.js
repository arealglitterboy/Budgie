import React from 'react';

const Option = (props) => (
    <section className="option">
        {(props.optionIndex > 0) && <p className="option__index">{props.optionIndex}.</p>}
        <p className="option__option-text">{props.option}</p>
        <button
            onClick={(e) => {props.handleDeleteOption(props.option)}}
            className="option__remove-option"
        >
            X
        </button>
    </section>
);

export default Option;