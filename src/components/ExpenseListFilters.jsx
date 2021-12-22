'use strict';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import { setFilterTerm, setContacts, setSortBy, setEndDate, setStartDate } from '../actions/filters.action';

import ReactDatePicker from 'react-datepicker';

import { isValidDate } from '../utility/validateDates';

import { Input } from './Input';
import InputSelect from './InputSelect';
import InputMultiSelect from './InputMultiSelect';

const option = (value, label) => ({ value, label });

const options = [
    option('byNewest', 'By Newest'),
    option('byOldest', 'By Oldest'),
    option('byAmountDescending', 'Amount Descending'),
    option('byAmountAscending', 'Amount Ascending'),
    option('byTitleDescending', 'Title Descending'),
    option('byTitleAscending', 'Title Ascending')
];

const onDateChange = (onSuccess) => ((input) =>{
    const date = new Date(input);

    if (isValidDate(date)) {
        onSuccess(date);
    }
});

export const ExpenseListFilters = (props) => {
    let [filtersVisible, setFiltersVisible] = useState(false);
    const toggleFiltersVisibility = () => setFiltersVisible(!filtersVisible);
    
    const clearFilters = () => {
        props.setStartDate();
        props.setEndDate();
        props.setSortBy();
        props.setContacts();
    };
    
    const contactToOption = ({id: value, name: label}) => ({ label, value });
    const selectContacts = ({id}) => props.filters.contacts.includes(id);

    const StartDateInput = React.forwardRef(({ value, onClick }, ref) => <Input type="text" label="Start Date" id="set-start-date" ref={ref} value={value} onChange={onDateChange(props.setStartDate)} onClick={onClick} />);
    const EndDateInput = React.forwardRef(({ value, onClick }, ref) => <Input type="text" label="End Date" id="set-end-date" ref={ref} value={value} onChange={onDateChange(props.setEndDate)} onClick={onClick} />);        

    return (
        <header className="filters">

            <section className="filters__top-level">
                <Input className="filters__top-level__search" label="Search" id="search-term" type="search" value={props.filters.term} onChange={props.setFilterTerm} />
                <div>
                    <InputSelect
                        label="Sort"
                        id="sort-expenses"
                        className="filters__top-level__sort"
                        onChange={props.setSortBy}
                        value={options.find(({value}) => value === props.filters.sortBy)}
                        isSearchable={false}
                        isClearable={false}
                        options={options}
                    />
                </div>
                <button className="filters__top-level__button" onClick={toggleFiltersVisibility} data-filters-visible={filtersVisible}>Filters</button>
            </section>

            <section className="filters__options" data-filters-visible={filtersVisible}>
                <div>
                    <ReactDatePicker
                        selectsStart
                        id="start-date"
                        className="filters__options__dates filters__options__dates--start"
                        dateFormat="dd/MM/yyyy"
                        selected={props.filters.startDate}
                        onChange={props.setStartDate}

                        startDate={props.filters.startDate}
                        endDate={props.filters.endDate}

                        maxDate={props.filters.endDate}
                        customInput={<StartDateInput />}
                    />
                </div>
                <div>
                    <ReactDatePicker
                        selectsEnd
                        id="end-date"
                        className="filters__options__dates filters__options__dates--end"
                        dateFormat="dd/MM/yyyy"
                        selected={props.filters.endDate}
                        onChange={props.setEndDate}
                
                        startDate={props.filters.startDate}
                        endDate={props.filters.endDate}
                
                        minDate={props.filters.startDate}
                        customInput={<EndDateInput />}
                    />
                </div>
                <div>
                    <InputMultiSelect 
                        label="Contacts"
                        id="contacts"
                        className="filters__options__contacts"
                        onChange={props.setContacts}
                        value={props.contacts.filter(selectContacts).map(contactToOption)}
                        options={props.contacts.map(contactToOption)}
                    />
                </div>
                <button className="filters__options__clear" onClick={clearFilters}>clear</button>
            </section>
        </header>
    );
}


const mapDispatchToProps = (dispatch) => ({
    setFilterTerm: (term) => dispatch(setFilterTerm(term)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
    setContacts: (contacts) => dispatch(setContacts(contacts))
});

const mapStateToProps = connect(({ filters, contacts }) => ({ filters, contacts }), mapDispatchToProps);

export default mapStateToProps(ExpenseListFilters);