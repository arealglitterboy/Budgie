'use strict';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import { setFilterTerm, setContacts, setSortBy, setEndDate, setStartDate, setCategories } from '../actions/filters.action';

import SearchInput from './filter/SearchInput';
import SortSelect from './filter/SortSelect';
import DateRangeInput from './filter/DateInput';
import ContactsSelect from './filter/ContactsSelect';
import CategoriesSelect from './filter/CategoriesSelect'
import { expenseSortOptions } from './filter/options';

export const ExpenseListFilters = (props) => {
    let [filtersVisible, setFiltersVisible] = useState(false);
    const toggleFiltersVisibility = () => setFiltersVisible(!filtersVisible);
    
    const clearFilters = () => {
        props.setFilterTerm();
        props.setStartDate();
        props.setEndDate();
        props.setSortBy();
        props.setContacts();
        props.setCategories();
    };

    return (
        <header className="filters">
            <section className="filters__top-level">
                <SearchInput
                    search={props.filters.term}
                    setSearch={props.setFilterTerm}
                />
                <SortSelect
                    options={expenseSortOptions}
                    sortBy={props.filters.sortBy}
                    setSortBy={props.setSortBy}
                />
                <button className="filters__top-level__button" onClick={toggleFiltersVisibility} data-filters-visible={filtersVisible}>Filters</button>
            </section>
            <section className="filters__options" data-filters-visible={filtersVisible}>
                <DateRangeInput
                    startDate={props.filters.startDate}
                    setStartDate={props.setStartDate}
                    endDate={props.filters.endDate}
                    setEndDate={props.setEndDate}
                />
                <ContactsSelect
                    selected={props.filters.contacts}
                    contacts={props.contacts}
                    setContacts={props.setContacts}
                />
                <CategoriesSelect 
                    setCategories={props.setCategories}
                    categories={props.filters.categories}
                />
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
    setContacts: (contacts) => dispatch(setContacts(contacts)),
    setCategories: (categories) => dispatch(setCategories(categories))
});

const mapStateToProps = connect(({ filters, contacts }) => ({ filters, contacts }), mapDispatchToProps);

export default mapStateToProps(ExpenseListFilters);