import React, { Component } from 'react'

/**
 * Component for text based inputs
 * 
 * @component
 * @example
 * const type = "text"
 * const id = "text-input"
 * const value = "Hello World"
 * const label = "Message"
 * return <Input type={type} value={value} label={label} id={id} />;
 */
export class Input extends Component {
    state = {
        active: (this.props.value) ? 'active' : 'inactive',
        value: this.props.value ? this.props.value : ''
    }

    onFocus = () => {
        this.setState({ active: 'active' });
    }

    onChange = (e) => {
        const value = e.target.value;
        if (!this.props.validator || this.props.validator(value)) {
            this.setState({ value });
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }

    onBlur = () => {
        if (!this.state.value) {
            this.setState(() => ({ active: 'inactive' }));
        }
    }

    render() {
        return (
            <label htmlFor={this.props.id} className={`input input--text input--${this.state.active} ${this.props.className || ''}`}>
                <span className={`input__label input__label--${this.state.active}`}>{this.props.label}</span>
                <input className="input__input" type={this.props.type} id={this.props.id} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} onClick={this.props.onClick} value={this.state.value} />
            </label>
        )
    }
}