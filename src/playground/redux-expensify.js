import { createStore, combineReducers } from 'redux';
import {v4 as uuid} from 'uuid';

// > Expenses Actions

const addExpense = (
    {
        title = '',
        note = '',
        amount = 0,
        date = 0
    } = {}
    ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        title,
        note,
        amount,
        date
    }
});

const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// > Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter((e) => (e.id !== action.id));
        case 'EDIT_EXPENSE': // ? Map each value in the array into a new array, if the id matches the selected id map it with its new values
            return state.map((e) => (e.id === action.id ? {...e, ...action.updates} : {...e}));
        default:
            return state;
    }
};

// > Filters Actions

const setFilterTerm = (term) => ({ type: 'SET_FILTER_TERM', term });

const sortByDate = () => ({ type: 'SORT_BY_DATE', sortBy: 'newest' });

const sortByAmount = () => ({ type: 'SORT_BY_AMOUNT', sortBy: 'amount' });

const setStartDate = (date) => ({ type: 'SET_START_DATE', date });

const setEndDate = (date) => ({ type: 'SET_END_DATE', date });

const sort = {
    byNewest: (e1, e2) => (e2.date - e1.date),
    byOldest: (e1, e2) => (e1.date - e2.date),
    byAmountDescending: (e1, e2) => (e2.amount - e1.amount),
    byAmountAscending: (e1, e2) => (e1.amount - e2.amount)
};

// > Filters Reducer

const filtersReducerDefaultState = {
    term: '',
    sortBy: 'newest',
    sortFunction: (e1, e2) => (e2.date - e1.date),
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_TERM':
            return { ...state, term: action.term };
        case 'SORT_BY_DATE':
            return { ...state, sortBy: action.sortBy, sortFunction: sort.byNewest }
        case 'SORT_BY_AMOUNT':
            return { ...state, sortBy: action.sortBy, sortFunction: sort.byAmountDescending };
        case 'SET_START_DATE':
            return { ...state, startDate: action.date };
        case 'SET_END_DATE':
            return { ...state, endDate: action.date };
        default:
            return state;
    }
};

// > Get visible expenses

const containsIgnoreCase = (key, searching) => (!key || (searching && searching.toLowerCase().includes(key.toLowerCase())));

const isUndefined = (x) => (typeof x === 'undefined');

function filterExpense(expense, term, startDate, endDate) {
    const containsTerm = containsIgnoreCase(term, expense.title) || containsIgnoreCase(term, expense.title); // ? If either the title or the title contains the search term.
    const inDate = (isUndefined(startDate) || expense.date >= startDate) && (isUndefined(endDate) || expense.date <= endDate); // ? If the start/end date is defined, and the given date is greater/less than it.
    
    return containsTerm && inDate;
}

const getVisibleExpenses = (expenses, { term, startDate, endDate, sortFunction }) => {
    return expenses.filter((e) => (filterExpense(e, term, startDate, endDate))).sort(sortFunction);
};

// > Store Creation

const store = createStore(
    combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
    })
);

// > Store Testing

store.subscribe(() => {
    const state = store.getState();
    const visible = getVisibleExpenses(state.expenses, state.filters);
    console.log(visible, (visible) ? visible.length : 0);
});

console.log(store.getState());

const expenseOne = store.dispatch(addExpense({ title: 'Rent', amount: 10000 }));
const expenseTwo = store.dispatch(addExpense({ title: 'Lent', amount: 100000 }));
const expenseThree = store.dispatch(addExpense({ title: 'Covfefe', amount: 250 }));
const expenseFour = store.dispatch(addExpense({ title: 'Coffee', amount: 2500, date: 1000 }));

const removeId = expenseThree.expense.id;

store.dispatch(removeExpense(removeId));

store.dispatch(editExpense(expenseTwo.expense.id, { amount: 200 }));

store.dispatch(sortByAmount());

store.dispatch(sortByDate());

// store.dispatch(setFilterTerm('ENT'));

// store.dispatch(setEndDate(100));
// store.dispatch(setStartDate(100));