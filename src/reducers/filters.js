import moment from "moment";

const sort = {
    byNewest: (e1, e2) => (e2.date - e1.date),
    byOldest: (e1, e2) => (e1.date - e2.date),
    byAmountDescending: (e1, e2) => (e2.amount - e1.amount),
    byAmountAscending: (e1, e2) => (e1.amount - e2.amount)
};

const getSort = (by) => ((typeof sort[by] !== 'undefined') ? { sortBy: by, sortFunction: sort[by] } : {});

const defaultState = {
    term: '',
    sortBy: 'byNewest',
    sortFunction: sort['byNewest'],
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_TERM':
            return { ...state, term: action.term };
        case 'SORT_BY':
            return { ...state, ...getSort(action.sortBy) };
        case 'SET_START_DATE':
            return { ...state, startDate: action.date };
        case 'SET_END_DATE':
            return { ...state, endDate: action.date };
        case 'SORT_BY_DATE_NEWEST':
            return { ...state, ...getSort('byNewest') }
        case 'SORT_BY_DATE_OLDEST':
            return { ...state, ...getSort('byOldest')};
        case 'SORT_BY_AMOUNT_DESCENDING':
            return { ...state, ...getSort('byAmountDescending') };
        default:
            return state;
    }
};