'use strict';
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const cleanStyles = ({ padding, margin, paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft, ...previous }) => (previous)
const indicatorStyles = ({ padding, margin, paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft, ...previous }, state) => ({...previous, color: state.isFocused ? 'var(--colour, #0f0)' : 'var(--placeholder-colour, #000)'});
const separatorStyles = ({ padding, margin, paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft, ...previous }, state) => ({...previous, backgroundColor: state.isFocused ? 'var(--colour, #0f0)' : 'var(--placeholder-colour, #000)'});
const customStyles = {
    control: () => ({}),
    valueContainer: cleanStyles,
    inputContainer: cleanStyles,
    input: cleanStyles,
    clearIndicator: indicatorStyles,
    indicatorSeparator: separatorStyles,
    dropdownIndicator: indicatorStyles,
    option: (previous) => ({...previous, cursor: 'pointer'})
}

export default (props) => {
        const [active, setActive] = useState(!!props.value.label);
        
        const onChange = (change) => props.onChange(!!change ? change : {});

        return (
            <label htmlFor={props.id} className={`input input--${active || props.value.label ? 'active' : 'inactive'} ${props.className || ''}`}>
                <span className={`input__label input__label--${active || props.value.label ? 'active' : 'inactive'}`}>{props.label}</span>
                <CreatableSelect
                    options={props.options}
                    id={props.id}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    isClearable
                    backspaceRemovesValue
                    placeholder=''
                    isSearchable
                    value={props.value.label ? props.value : undefined}
                    onChange={onChange}
                    className="input__select"
                    classNamePrefix="input__select"
                    styles={customStyles}
                />
            </label>
        );
    }