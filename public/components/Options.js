import React from 'react';

import Option from './Option';

const Options = (props) => (
    <div className="widget">
        {getHeader(props.options && props.options.length > 0, props.handleDeleteOptions)}
        {
            (props.options && props.options.length > 0) &&
            <div className="list-holder">
                <article className="options">                    
                    {
                        props.options.map((option, index) => createOption(option, props.handleDeleteOption, index + 1))
                    }
                </article>
            </div>
        }
    </div>
);

const getHeader = (hasOptions, handleDeleteOptions) => (
    <header className="widget__header">
        <h4 className="widget__header__text"> {
            (hasOptions) ? 'Here are your options' : 'Enter an option'
        }</h4>
        {
            (hasOptions) &&
            <button onClick={handleDeleteOptions} className="widget__header__button button">
                Remove All
            </button>
        }
    </header>
);

const createOption = (option, handleDeleteOption, index=-1) => (
    <Option 
        key={option}
        option={option}
        handleDeleteOption={handleDeleteOption}
        optionIndex={index}
    />
);

export default Options;