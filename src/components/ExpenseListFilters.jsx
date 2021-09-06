import React from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';

import { setFilterTerm, sortByNewest, sortByOldest, sortByAmountDescending, sortByAmountAscending, setEndDate, setStartDate } from '../actions/filters';

const getSort = (sortBy) => {
    switch(sortBy) {
        case 'newest':
            return sortByNewest;
        case 'oldest':
            return sortByOldest;
        case 'amountAscending':
            return sortByAmountAscending;
        case 'amountDescending':
            return sortByAmountDescending;
        default:
            console.log('invalid sort selected');
    }
};

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onSearchTermChange = (e) => (this.props.dispatch(setFilterTerm(e.target.value)));
    onSortChange = (e) => (this.props.dispatch(getSort(e.target.value)()));
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    onFocusChange = (calendarFocused) => {this.setState(() => ({ calendarFocused }))};

    render() {

        return (
            <header>
                <div>
                    <label htmlFor="search-term">Search: </label>
                    <input type="search" id="search-term" onChange={this.onSearchTermChange} />
                </div>
                <div>
                    <label htmlFor="sort-expense">Sort By: </label>
                    <select id="sort-expenses" onChange={this.onSortChange}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="amountAscending">Amount ascending</option>
                        <option value="amountDescending">Amount descending</option>
                    </select>
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
                </div>
            </header>
        );
    }
}

// const ExpenseListFilters = ({ dispatch }) => {
//     const onSearchTermChange = (e) => (dispatch(setFilterTerm(e.target.value)));
//     const onSortChange = (e) => (dispatch(getSort(e.target.value)()));

//     return (
//         <header>
//             <div>
//                 <label htmlFor="search-term">Search: </label>
//                 <input type="search" id="search-term" onChange={onSearchTermChange} />
//             </div>
//             <div>
//                 <label htmlFor="sort-expense">Sort By: </label>
//                 <select id="sort-expenses" onChange={onSortChange}>
//                     <option value="newest">Newest</option>
//                     <option value="oldest">Oldest</option>
//                     <option value="amountAscending">Amount ascending</option>
//                     <option value="amountDescending">Amount descending</option>
//                 </select>
//                 <DateRangePicker  />
//             </div>
//         </header>
//     );
// };

const mapStateToProps = connect(({ filters }) => ({ filters: filters }));

export default mapStateToProps(ExpenseListFilters);