import moment from 'moment';
import filtersReducer from '../../reducers/filters.reducer';

// Test default values

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        term: '',
        sortBy: 'byNewest',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});