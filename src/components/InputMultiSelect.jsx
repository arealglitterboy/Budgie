import React, { useState } from 'react';
import Select from 'react-select';

const cleanStyles = ({ padding, margin, paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft, ...previous }) => (previous)

const customStyles = {
    control: () => ({}),
    valueContainer: cleanStyles,
    inputContainer: cleanStyles,
    input: cleanStyles,
    clearIndicator: cleanStyles,
    dropdownIndicator: cleanStyles,
    option: (previous) => ({...previous, cursor: 'pointer'})
}

export default (props) => {
        const [active, setActive] = useState(props.value.length > 0);
        
        const onChange = change => props.onChange(change.map(({value}) => value));

        return (
            <label htmlFor={props.id} className={`input input--${active || props.value.length > 0 ? 'active' : 'inactive'} ${props.className || ''}`}>
                <span className={`input__label input__label--${active || props.value.length > 0 ? 'active' : 'inactive'}`}>{props.label}</span>
                <Select
                    options={props.options}
                    id={props.id}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    isClearable
                    backspaceRemovesValue
                    placeholder=''
                    isSearchable
                    isMulti
                    value={props.value}
                    onChange={onChange}
                    className='input__select'
                    classNamePrefix="input__select"
                    styles={customStyles}
                />
            </label>
        );
    }