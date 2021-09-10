import moment from 'moment';
import filtersReducer from '../../reducers/filters.reducer';

// Default values
test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        term: '',
        sortBy: 'byNewest',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
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
    const currentState = { term: '', startDate: moment().startOf('month'), endDate: moment().endOf('month'), sortBy: 'byAmountAscending' };
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
    const currentState = { term: 'initial search term', startDate: moment().startOf('month'), endDate: moment().endOf('month'), sortBy: 'byNewest' };
    const action = { type: 'SET_FILTER_TERM', term: '' };

    const state = filtersReducer(currentState, action);
    expect(state.term).toBe('');
});

// Setting the start date filter
test('should set the start date filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', date: moment("2010-06-10") });
    expect(state.startDate).toEqual(moment("2010-06-10"));
});

test('should reset the start date filter', () => {
    const currentState = { term: 'initial search term', startDate: moment("2021-01-01"), endDate: moment().endOf('month'), sortBy: 'byNewest' };
    const action = { type: 'SET_START_DATE', date: 0 };

    const state = filtersReducer(currentState, action);
    expect(state.startDate).toBe(0);
});

// Setting the end date filter
test('should set the end date filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', date: moment("2021-11-16") });
    expect(state.endDate).toEqual(moment("2021-11-16"));
});

test('should reset the end date filter', () => {
    const currentState = { term: 'initial search term', startDate: moment().startOf('month'), endDate: moment("2021-01-01"), sortBy: 'byNewest' };
    const action = { type: 'SET_END_DATE', date: 0 };

    const state = filtersReducer(currentState, action);
    expect(state.endDate).toBe(0);
});