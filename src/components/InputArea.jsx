import React, { Component } from 'react'

import TextareaAutosize from 'react-textarea-autosize';

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
export class InputArea extends Component {
    state = {
        active: (this.props.value) ? 'active' : 'inactive',
        value: this.props.value ? this.props.value : '',
        height: 'auto'
    }

    onFocus = () => {
        this.setState({ active: 'active' });
    }

    onChange = (e) => {
        const value = e.currentTarget.value;
        if (!this.props.validator || this.props.validator(value)) {
            this.setState({ value });
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }

    onInput = (e) => {
        this.setState({height: "auto"});
        this.setState({height: `${e.currentTarget.scrollHeight}px`});
    }

    onBlur = () => {
        if (!this.state.value.trim()) {
            this.setState(() => ({ active: 'inactive', value: '' }));
        }
    }

    render() {
        return (
            <label data-style={this.props['data-style']} htmlFor={this.props.id} className={`input input--text input--${this.state.active} ${this.props.className || ''}`}>
                <span className={`input__label input__label--${this.state.active}`}>{this.props.label || 'label'}</span>
                <TextareaAutosize
                    className="input__textarea input__input"
                    placeholder={this.props.placeholder || 'placeholder'}
                    value={this.state.value}
                    id={this.props.id}
                    onFocus={this.onFocus}
                    onInput={this.onInput}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onClick={this.props.onClick}
                />
            </label>
        )
    }
}