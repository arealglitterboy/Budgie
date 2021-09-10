import moment from "moment";

import {
    setFilterTerm,
    setSortBy,
    sortByNewest,
    sortByOldest,
    sortByAmountDescending,
    sortByAmountAscending,
    setStartDate,
    setEndDate
} from "../../actions/filters.action";

// setFilterTerm
test('should generate a set filter term object with default paramaters', () => {
    const action = setFilterTerm();
    expect(action).toEqual({ type: 'SET_FILTER_TERM', term: '' });
});

test('should generate a set filter term object with a given paramater', () => {
    const term = 'Hello World';
    const action = setFilterTerm(term);
    expect(action).toEqual({ type: 'SET_FILTER_TERM', term });
});

// sortByNewest
test('should generate a sort by newest object', () => {
    const action = sortByNewest();
    expect(action).toEqual({ type: 'SORT_BY_NEWEST' });
});

test('should generate a set sort by object with type newest', () => {
    const action = setSortBy('byNewest');
    expect(action).toEqual({ type: 'SORT_BY_NEWEST' });
});

// sortByOldest
test('should generate a sort by oldest object', () => {
    const action = sortByOldest();
    expect(action).toEqual({ type: 'SORT_BY_OLDEST' });
});

test('should generate a set sort by object with type oldest', () => {
    const action = setSortBy('byOldest');
    expect(action).toEqual({ type: 'SORT_BY_OLDEST' });
});

// sortByAmountDescending
test('should generate a sort by amount descending object', () => {
    const action = sortByAmountDescending();
    expect(action).toEqual({ type: 'SORT_BY_AMOUNT_DESCENDING' });
});

test('should generate a set sort by object with type amount descending', () => {
    const action = setSortBy('byAmountDescending');
    expect(action).toEqual({ type: 'SORT_BY_AMOUNT_DESCENDING' });
});

// sortByAmountAscending
test('should generate a sort by amount ascending object', () => {
    const action = sortByAmountAscending();
    expect(action).toEqual({ type: 'SORT_BY_AMOUNT_ASCENDING' });
});

test('should generate a set sort by object with type amount ascending', () => {
    const action = setSortBy('byAmountAscending');
    expect(action).toEqual({ type: 'SORT_BY_AMOUNT_ASCENDING' });
});

// setStartDate
test('should generate set start date action object', () => {
    const date = moment(1634012412000);
    const action = setStartDate(date);
    expect(action).toEqual({ type: 'SET_START_DATE', date });
});

// setEndDate
test('should generate set end date action object', () => {
    const date = moment(1634012412000);
    const action = setEndDate(date);
    expect(action).toEqual({ type: 'SET_END_DATE', date });
});