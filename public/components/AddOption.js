import React from 'react';

export default class AddOption extends React.Component {
    state = {
        error: undefined
    };

    render() {
        return (
            <div className="add-option">
                {(this.state.error && <p className="error">{this.state.error}</p>)}
                <form onSubmit={this.handleSubmit} className="add-option__form">
                    <input type="text" className="add-option__form__input" name="option" placeholder="Insert an option here"/>
                    {/* <span contentEditable="true" className="add-option__form__input">Insert an option here</span> */}
                    <button className="add-option__form__button action-button button">Add</button>
                </form>
            </div>
        );
        // * input element has name 'option'
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const error = this.props.handleAddOption(e.target.elements.option.value.trim());
        
        this.setState(() => ({ error }));
        
        if(!error) {
            e.target.elements.option.value = '';
        }
    };
};