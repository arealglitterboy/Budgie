import React from 'react';

const Action = (props) => (
    <div className="main-button-holder">
        <button className="action-button button" disabled={!props.hasOptions} onClick={props.handleSelection}>
            What Will You Do?
        </button>
    </div>
);

export default Action;