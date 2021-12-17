import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/Router';

import configureStore from './store/configure.store';
import { addExpense } from './actions/expenses.action';

import 'normalize.css';
import "react-datepicker/dist/react-datepicker.css";
import './styles/styles.sass';

function setupStore(store) {
    store.dispatch(addExpense({ title: 'test', participant: '1294124', category: ['Test'], amount: 42050, date: Date.UTC(2001, 3, 9) }));
    store.dispatch(addExpense({ title: 'test 2', participant: '1294124', category: ['Stuff', 'Shit'], note: `Shit was litty, I was buying stuff and shit. Shit was crazy, also, 120498 divided by 232 equals ${120498/232}`, amount: 100000, date: 100420 }));
    store.dispatch(addExpense({ title: 'Real Expense', participant: '12f9391', note: `This one's real!`, category: ['Real Stuff'], amount: 10000, date: 1628000000020 }));
    store.dispatch(addExpense({ title: 'Gas Bill', participant: '543252', note: `This is the bill for a really fun time I had with someone`, category: ['Fun Things', 'Day Out', 'Food'], amount: 1560075, date: Date.UTC(2021, 6, 13, 16, 30) }));
}

const store = configureStore();
setupStore(store);

const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));