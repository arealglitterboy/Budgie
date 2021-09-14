import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/Router';

import configureStore from './store/configure.store';
import { addExpense } from './actions/expenses.action';

import './styles/styles.scss';
import 'normalize.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function setupStore(store) {
    store.dispatch(addExpense({ description: 'test', currency: 'EUR', amount: 42050, date: Date.UTC(2001, 3, 9) }));
    store.dispatch(addExpense({ description: 'test 2', note: `Shit was litty, I was buying stuff and shit. Shit was crazy, also, 120498 divided by 232 equals ${120498/232}`, currency: 'EUR', amount: 100000, date: 100420 }));
    store.dispatch(addExpense({ description: 'Real Expense', note: `This one's real!`, currency: 'EUR', amount: 10000, date: 1628000000020 }));
    store.dispatch(addExpense({ description: 'Gas Bill', note: `This is the bill for a really fun time I had with someone`, currency: 'GBP', amount: 1560075, date: Date.UTC(2021, 6, 13, 16, 30) }));
}

const store = configureStore();
setupStore(store);

const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));