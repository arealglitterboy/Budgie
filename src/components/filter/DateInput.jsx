import React from 'react'
import ReactDatePicker from 'react-datepicker';

import { Input } from '../Input';

const onDateChange = (onSuccess) => ((input) =>{
    const date = new Date(input);

    if (isValidDate(date)) {
        onSuccess(date);
    }
});

export const DateRangeInput = (props) => {
    const CustomInput = (customProps) => (React.forwardRef(({ value, onClick }, ref) => (
        <Input
            type="text"
            ref={ref}
            value={value}
            onClick={onClick}
            {...customProps}
        />
    )));
    
    const DateInput = (inputProps) => (
        <div>
            <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                startDate={props.startDate}
                endDate={props.endDate}
                {...inputProps}
            />
        </div>
    )

    const StartDate = CustomInput({label:"Start Date", id:"set-start-date-input", onChange: onDateChange(props.setStartDate)});
    const EndDate = CustomInput({label:"End Date", id:"set-end-date-input", onChange: onDateChange(props.setEndDate)})
    
    return (
        <>
            <DateInput
                selectsStart
                id='set-start-date'
                className="date-input date-input--start"
                selected={props.startDate}
                onChange={props.setStartDate}
                maxDate={props.endDate}
                customInput={<StartDate />}
            />
            <DateInput
                selectsEnd
                id='set-end-date'
                className="date-input date-input--end"
                selected={props.endDate}
                onChange={props.setEndDate}
                minDate={props.startDate}
                customInput={<EndDate />}
            />
        </>
    );
};

export default DateRangeInput