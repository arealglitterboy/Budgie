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
        const [active, setActive] = useState(!!props.value ? 'active' : 'inactive');

        const onChange = ({value=''} = {}) => props.onChange(value);

        return (
            <label htmlFor={props.id} className={`input input--${active} ${props.className || ''}`}>
                <span className={`input__label input__label--${active}`}>{props.label}</span>
                <Select 
                    options={props.options}
                    id={props.id}
                    onFocus={() => setActive('active')}
                    onBlur={() => setActive(props.value ? 'active' : 'inactive')}
                    isClearable={props.hasOwnProperty('isClearable') ? !!props.isClearable : true}
                    backspaceRemovesValue
                    placeholder=''
                    isSearchable={props.hasOwnProperty('isSearchable') ? !!props.isSearchable : true}
                    value={props.value}
                    onChange={onChange}
                    className={`input__select${props.hasOwnProperty('isSearchable') && !props.isSearchable ? ' input__select--no-search' : ''}`}
                    classNamePrefix="input__select"
                    styles={customStyles}
                />
            </label>
        );
    }