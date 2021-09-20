import moment from 'moment';
import filtersReducer from '../../reducers/filters.reducer';
import { createFromDefault } from '../fixtures/filters.fixture';

// Default values
test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        term: '',
        sortBy: 'byNewest',
        startDate: undefined,
        endDate: undefined
    });
});

// Set sort by
test('should set sort by to amount descending', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT_DESCENDING' });
    expect(state.sortBy).toBe('byAmountDescending');
});

test('should set sort by to amount ascending', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT_ASCENDING' });
    expect(state.sortBy).toBe('byAmountAscending');
});

test('should set sort by newest', () => {
    const currentState = createFromDefault({ sortBy: 'byAmountAscending' });
    const action = { type: 'SORT_BY_NEWEST' };

    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('byNewest');
});

test('should set sort by oldest', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_OLDEST' });
    expect(state.sortBy).toBe('byOldest');
});

// Setting the search term
test('should set the search term', () => {
    const state = filtersReducer(undefined, { type: 'SET_FILTER_TERM', term: 'test val' });
    expect(state.term).toBe('test val');
});

test('should reset the search term', () => {
    const currentState = createFromDefault({ term: 'initial search term' });
    const action = { type: 'SET_FILTER_TERM', term: '' };

    const state = filtersReducer(currentState, action);
    expect(state.term).toBe('');
});

// Setting the start date filter
test('should set the start date filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', date: new Date("2010-06-10") });
    expect(state.startDate.valueOf()).toEqual(new Date("2010-06-10").valueOf());
});

test('should reset the start date filter', () => {
    const currentState = { term: 'initial search term', startDate: new Date("2021-01-01"), endDate: new Date("2021-01-31"), sortBy: 'byNewest' };
    const action = { type: 'SET_START_DATE', date: undefined };

    const state = filtersReducer(currentState, action);
    expect(state.startDate).toBe(undefined);
});

// Setting the end date filter
test('should set the end date filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', date: new Date("2021-11-16") });
    expect(state.endDate.valueOf()).toEqual(new Date("2021-11-16").valueOf());
});

test('should reset the end date filter', () => {
    const currentState = { term: 'initial search term', startDate: new Date("2021-01-01"), endDate: moment("2021-01-31"), sortBy: 'byNewest' };
    const action = { type: 'SET_END_DATE', date: undefined };

    const state = filtersReducer(currentState, action);
    expect(state.endDate).toBe(undefined);
});