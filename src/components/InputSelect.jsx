import React, { Component, useState } from 'react';
import Select from 'react-select';

export default (props) => {
        const [active, setActive] = useState(!!props.value);
        const [value, setValue] = useState(props.value);
        const onChange = (change) => {
            setValue(change);
            props.onChange(change);
        };

        const cleanStyles = ({ padding, margin, paddingTop, paddingBottom, marginTop, marginBottom, ...previous}) => (previous)

        const customStyles = {
            control: () => ({}),
            valueContainer: cleanStyles,
            inputContainer: cleanStyles,
            input: cleanStyles,
            clearIndicator: cleanStyles,
            dropdownIndicator: cleanStyles
        }

        return (
            <label data-style={props['data-style']} htmlFor={props.id} className={`input input--${active} ${props.className || ''}`}>
                <span className={`input__label input__label--${active}`}>{props.label}</span>
                <Select 
                    options={props.options}
                    id={props.id}
                    onFocus={() => setActive('active')}
                    onBlur={() => setActive(value ? 'active' : 'inactive')}
                    isClearable
                    backspaceRemovesValue
                    placeholder=''
                    isSearchable
                    value={value}
                    onChange={onChange}
                    className="input__select"
                    classNamePrefix="input__select"
                    styles={customStyles}
                />
            </label>
        );
    }