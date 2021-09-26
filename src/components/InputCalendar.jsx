import React, { Component } from 'react'
import ReactDatePicker from 'react-datepicker';

import { Input } from './Input';
import { isValidDate } from '../utility/validateDates';

export default class InputCalendar extends Component {
    state = {
        date: this.props.date ? this.props.date : ''
    }

    onInputChange = (value) => {
        const date = new Date(value);

        if (isValidDate(date)) {
            this.setDate(date);
        }
    };

    onChange = (e) => {}

    setDate = (date) => {this.setState({ date })};

    render() {
        const CustomInput = React.forwardRef(({ value, onClick }, ref) => <Input type="text" label={this.props.label} id={this.props.id} ref={ref} value={value} onChange={this.onInputChange} onClick={onClick} />);
        return (
            <ReactDatePicker
                dateFormat="dd/MM/yyyy"

                startDate={this.props.filters.startDate}
                endDate={this.props.filters.endDate}

                maxDate={this.state.endDate}
                selected={this.state.date}
                onChange={this.setDate}
                customInput={<CustomInput />}
            />
        )
    }
}