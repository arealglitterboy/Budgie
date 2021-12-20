import React from 'react';

import { connect } from 'react-redux';
import { setFilterTerm, setSortBy, setEndDate, setStartDate } from '../actions/filters.action';

import ReactDatePicker from 'react-datepicker';

import { isValidDate } from '../utility/validateDates';

import { Input } from './Input';
import InputSelect from './InputSelect';

export class ExpenseListFilters extends React.Component {
    state = {
        startDate: undefined,
        endDate: undefined,
        filtersVisible: false
    };
    
    onSearchTermChange = (e) => this.props.setFilterTerm(e.target.value);

    onSortChange = (e) => this.props.setSortBy(e.target.value);

    onStartDateChange = (input) => {
        const date = new Date(input);

        if (isValidDate(date)) {
            this.setStartDate(date);
        }
    }

    onEndDateChange = (input) => {
        const date = new Date(input);

        if (isValidDate(date)) {
            this.setEndDate(date);
        }
    }
    
    setSortBy = (sortBy) => this.props.setSortBy(sortBy);

    setStartDate = (startDate) => this.props.setStartDate(startDate);

    setEndDate = (endDate) => this.props.setEndDate(endDate);

    toggleFilters = () => this.setState(() => ({ filtersVisible: !this.state.filtersVisible }))
    
    option = (value, title) => ({ value, title });

    options = [
        this.option('byNewest', 'By Newest'),
        this.option('byOldest', 'By Oldest'),
        this.option('byAmountDescending', 'Amount Descending'),
        this.option('byAmountAscending', 'Amount Ascending'),
        this.option('byTitleDescending', 'Title Descending'),
        this.option('byTitleAscending', 'Title Ascending')
    ];
        
    render() {
        const StartDateInput = React.forwardRef(({ value, onClick }, ref) => <Input type="text" label="Start Date" id="set-start-date" ref={ref} value={value} onChange={this.onStartDateChange} onClick={onClick} />);
        const EndDateInput = React.forwardRef(({ value, onClick }, ref) => <Input type="text" label="End Date" id="set-end-date" ref={ref} value={value} onChange={this.onEndDateChange} onClick={onClick} />);
        
        return (
            <header className="filters">
                <Input className="filters__search" label="Search" id="search-term" type="search" onChange={this.props.setFilterTerm} />

                <button className="filters__button" onClick={this.toggleFilters} data-filters-visible={this.state.filtersVisible}>Filters</button>

                <fieldset className="filters__options" data-filters-visible={this.state.filtersVisible}>
                    <div>
                        <InputSelect label="Sort" id="sort-expenses" onChange={this.setSortBy} options={this.options} />
                    </div>
                    <div>
                        <ReactDatePicker
                            selectsStart
                            id="start-date"
                            className="expense-filters__dates__input"
                            dateFormat="dd/MM/yyyy"
                            selected={this.props.filters.startDate}
                            onChange={this.setStartDate}
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            maxDate={this.state.endDate}
                            customInput={<StartDateInput />}
                        />
                    </div>
                    <div>
                        <ReactDatePicker
                            selectsEnd
                            id="end-date"
                            className="expense-filters__dates__input"
                            dateFormat="dd/MM/yyyy"
                            selected={this.props.filters.endDate}
                            onChange={this.setEndDate}
                    
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                    
                            minDate={this.state.startDate}
                            customInput={<EndDateInput />}
                        />
                    </div>
                </fieldset>
            </header>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
    setFilterTerm: (term) => dispatch(setFilterTerm(term))
});

const mapStateToProps = connect((state) => ({ filters: state.filters }), mapDispatchToProps);

export default mapStateToProps(ExpenseListFilters);