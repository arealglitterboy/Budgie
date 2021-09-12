import React from 'react';
import { DateRangePicker } from 'react-dates';
// import ReactDatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import { setFilterTerm, setSortBy, setEndDate, setStartDate } from '../actions/filters.action';

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onSearchTermChange = (e) => this.props.setFilterTerm(e.target.value);

    onSortChange = (e) => this.props.setSortBy(e.target.value);
    
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }
    
    onFocusChange = (calendarFocused) => {this.setState(() => ({ calendarFocused }))};

    render() {
        return (
            <header>
                <section>
                    <label htmlFor="search-term">Search: </label>
                    <input type="search" id="search-term" onChange={this.onSearchTermChange} />
                </section>
                <section>
                    <label htmlFor="sort-expense">Sort By: </label>
                    <select id="sort-expenses" onChange={this.onSortChange}>
                        <option value="byNewest">Newest</option>
                        <option value="byOldest">Oldest</option>
                        <option value="byAmountDescending">Amount descending</option>
                        <option value="byAmountAscending">Amount ascending</option>
                    </select>
                    {/* <ReactDatePicker
                        selected={this.startDate}
                        onChange={(date) => this.startDate = date}
                    /> */}
                    <DateRangePicker
                        startDate={this.props.filters.startDate}
                        startDateId="range-filter-start"
                        endDate={this.props.filters.endDate}
                        endDateId="range-filter-end"
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        showClearDates={true}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                </section>
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