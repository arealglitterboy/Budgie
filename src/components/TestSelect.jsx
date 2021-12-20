import React, {useState} from 'react';
import SelectSearch, {fuzzySearch} from 'react-select-search';
// import { useSelect } from 'react-select-search';

// export default ({ options, value, multiple, className, id, label, disabled }) => {
//     const [snapshot, valueProps, optionProps] = useSelect({
//         options,
//         value,
//         multiple,
//         disabled,
//     });

//     console.log(valueProps)

//     return (
//         <div>
//             <label htmlFor={id} className={`input input--text input--${snapshot.focus || snapshot.displayValue ? 'active' : 'inactive'} ${className || ''}`}>
//                 <span className={`input__label input__label--${snapshot.focus || snapshot.displayValue ? 'active' : 'inactive'}`}>{label}</span>
//                 <input className="input__input" value={snapshot.displayValue} id={id} {...valueProps} />
//             </label>
//             {snapshot.focus && (
//                 <ul>
//                     {snapshot.options.map((option) => (
//                         <li key={option.value}>
//                             <button {...optionProps} value={option.value}>{option.name}</button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

export default (props) => {
    const [active, setActive] = useState(!!props.value);
    const [value, setValue] = useState(props.value);

    return (
    <SelectSearch
        options={props.options}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        renderValue={ (valueProps) =>(
            <label htmlFor={props.id} className={`input input--text input--${active || valueProps.value ? 'active' : 'inactive'} ${props.className || ''}`}>
                <span className={`input__label input__label--${active || valueProps.value ? 'active' : 'inactive'}`}>{props.label}</span>
                <input className="input__input" onChange={setValue} value={valueProps.value} id={props.id} {...valueProps} />
            </label>
        )}
        {...props}
        search
        filterOptions={(options) => {
            const filter = fuzzySearch(options);

            return (q) => filter(q).slice(0, 8);
        }}
        // onChange={setValue}
        // value={value}
    />
)};