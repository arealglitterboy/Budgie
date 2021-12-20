import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const cleanStyles = ({ padding, margin, paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft, ...previous }) => (previous)

const customStyles = {
    control: () => ({}),
    valueContainer: cleanStyles,
    inputContainer: cleanStyles,
    input: cleanStyles,
    clearIndicator: cleanStyles,
    dropdownIndicator: cleanStyles
}

export default (props) => {
        const [value, setValue] = useState(props.value);
        const [active, setActive] = useState(!!props.value);
        
        const onChange = (change) => {
            setValue(change);
            props.onChange(!!change ? change : {});
        };

        return (
            <label data-style={props['data-style']} htmlFor={props.id} className={`input input--${active} ${props.className || ''}`}>
                <span className={`input__label input__label--${active}`}>{props.label}</span>
                <CreatableSelect
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