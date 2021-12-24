'use strict';
import React from 'react';

import { connect } from 'react-redux';
import { setCategories, setFilterTerm, setSortBy } from '../actions/contactsFilters.action';

import SearchInput from './filter/SearchInput';
import CategoriesSelect from './filter/CategoriesSelect';
import SortSelect from './filter/SortSelect';

const option = (value, label) => ({ value, label });

const options = [
    option('byNewest', 'By Newest'),
    option('byOldest', 'By Oldest'),
    option('byNameDescending', 'Name Descending'),
    option('byNameAscending', 'Name Ascending')
];

export const ContactListFilters = (props) => {
    const clearFilters = () => {
        props.setSortBy();
        props.setFilterTerm();
        props.setCategories();
    };

    return (
        <header className="contacts-filters">
            <SearchInput 
                search={props.filters.term}
                setSearch={props.setFilterTerm}
            />
            <SortSelect 
                options={options}
                sortBy={props.filters.sortBy}
                setSortBy={props.setSortBy}
            />
            <CategoriesSelect 
                categories={props.filters.categories}
                setCategories={props.setCategories}
            />
            <button className="contacts-filters__clear" onClick={clearFilters}>clear</button>
        </header>
    );
}


const mapDispatchToProps = (dispatch) => ({
    setFilterTerm: (term) => dispatch(setFilterTerm(term)),
    setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
    setCategories: (categories) => dispatch(setCategories(categories))
});

const mapStateToProps = connect(({ contactsFilters }) => ({ filters: contactsFilters }), mapDispatchToProps);

export default mapStateToProps(ContactListFilters);