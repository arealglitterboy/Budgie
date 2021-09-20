import React, { Component } from 'react'

export class Input extends Component {
    state = {
        active: (this.props.value) ? 'active' : 'inactive',
        value: this.props.value
    }

    onFocus = () => {
        this.setState(() => ({ active: 'active' }));
    }

    onChange = (e) => {
        const value = e.target.value;
        if (!this.props.validator || this.props.validator(value)) {
            this.setState(() => ({ value }));
        }
    }

    onBlur = () => {
        if (!this.state.value) {
            this.setState(() => ({ active: 'inactive' }));
        }
    }

    render() {
        return (
            <label htmlFor="search-term" className={`input input--${this.state.active}`}>
                <span className={`input__label input__label--${this.state.active}`}>{this.props.label}</span>
                <input className="input__input" type="search" id="search-term" onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} value={this.state.value} />
            </label>
        )
    }
}