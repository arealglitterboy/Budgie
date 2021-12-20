import { createStore, combineReducers } from "redux";

import expensesReducer from '../reducers/expenses.reducer';
import filtersReducer from '../reducers/filters.reducer';

import contactsReducer from "../reducers/contacts.reducer";
import contactsFiltersReducer from "../reducers/contactsFilters.reducer";

export default function() {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            contacts: contactsReducer,
            contactsFilters: contactsFiltersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}