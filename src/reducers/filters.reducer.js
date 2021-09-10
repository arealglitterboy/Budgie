import moment from "moment";

const defaultState = {
    term: '',
    sortBy: 'byNewest',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_TERM':
            return { ...state, term: action.term };
        case 'SET_START_DATE':
            return { ...state, startDate: action.date };
        case 'SET_END_DATE':
            return { ...state, endDate: action.date };
        // case 'SORT_BY':
        //     return { ...state, sortBy };
        case 'SORT_BY_DATE_NEWEST':
            return { ...state, sortBy: 'byNewest' }
        case 'SORT_BY_DATE_OLDEST':
            return { ...state, sortBy: 'byOldest' };
        case 'SORT_BY_AMOUNT_DESCENDING':
            return { ...state, sortBy: 'byAmountDescending' };
        case 'SORT_BY_AMOUNT_ASCENDING':
            return { ...state, sortBy: 'byAmountAscending' };
        default:
            return state;
    }
};