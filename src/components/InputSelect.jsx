import React, { Component } from 'react'

export default class InputSelect extends Component {
    state = {
        value: '',
        active: 'inactive'
    }

    onFocus = (e) => {
        this.setState({ active: 'active' });
    }

    onChange = (e) => {
        const value = e.target.value;
        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    onBlur = () => {
        if (!this.state.value) {
            this.setState(() => ({ active: 'inactive' }));
        }
    }

    render() {
        return (
            <fieldset className={`input input--select input--${this.state.active} ${this.props.className || ''}`}>
                <label htmlFor="" className={`input__label input__label--${this.state.active}`}>{this.props.label}</label>
                <select
                    className="input__input input__input--select"
                    id={this.props.id}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    value={this.state.value}
                >
                    <option value="" disabled hidden></option>
                    {
                        this.props.options && this.props.options.map(({ value, title }) => <option className="input__input--select__option" key={value} value={value}>{title}</option>)
                    }
                </select>
            </fieldset>
        );
    }
}
