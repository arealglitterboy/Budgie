import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import { setFilterTerm, setSortBy, setEndDate, setStartDate } from '../actions/filters.action';

export class ExpenseListFilters extends React.Component {
    state = {
        startDate: undefined,
        endDate: undefined
    };
    
    onSearchTermChange = (e) => this.props.setFilterTerm(e.target.value);

    onSortChange = (e) => this.props.setSortBy(e.target.value);
    
    setStartDate = (startDate) => this.props.setStartDate(startDate);

    setEndDate = (endDate) => this.props.setEndDate(endDate);    

    render() {
        return (
            <header className="expense-filters">
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
                    <section className="expense-filters__dates">
                        <ReactDatePicker
                            selectsStart
                            className="expense-filters__dates__input"
                            dateFormat="dd/MM/yyyy"

                            selected={this.props.filters.startDate}
                            onChange={this.setStartDate}

                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}

                            maxDate={this.state.endDate}
                        />
                        <ReactDatePicker
                            selectsEnd
                            className="expense-filters__dates__input"
                            dateFormat="dd/MM/yyyy"

                            selected={this.props.filters.endDate}
                            onChange={this.setEndDate}
                            
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            
                            minDate={this.props.filters.startDate}
                        />
                    </section>
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