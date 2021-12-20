import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/Router';

import configureStore from './store/configure.store';
import { addExpense } from './actions/expenses.action';
import { addContact } from './actions/contacts.action';

import 'normalize.css';
import "react-datepicker/dist/react-datepicker.css";
import './styles/styles.sass';

function setupStore(store) {
    store.dispatch(addContact({ id: '1294124', name: 'Mike Michaels', date: new Date('2016-09-12'), categories: ['Father'] }));
    store.dispatch(addContact({ id: '12f9391', name: 'Genuine Company', date: new Date('2020-01-21'), categories: ['Business', 'Food Stuffs'] }));
    store.dispatch(addContact({ id: '543252', name: 'Applegreen', date: new Date('2019-10-28'), categories: ['Business', 'Petrol Station'] }));

    store.dispatch(addExpense({ title: 'test', contact: '1294124', categories: ['Test'], amount: 42050, date: Date.UTC(2001, 3, 9) }));
    store.dispatch(addExpense({ title: 'test 2', contact: '1294124', categories: ['Stuff', 'Shit'], note: `Shit was litty, I was buying stuff and shit. Shit was crazy, also, 120498 divided by 232 equals ${120498/232}`, amount: 100000, date: 100420 }));
    store.dispatch(addExpense({ title: 'Real Expense', contact: '12f9391', note: `This one's real!`, categories: ['Real Stuff'], amount: 10000, date: 1628000000020 }));
    store.dispatch(addExpense({ title: 'Gas Bill', contact: '543252', note: `This is the bill for a really fun time I had with someone`, categories: ['Fun Things', 'Day Out', 'Food'], amount: 1560075, date: Date.UTC(2021, 6, 13, 16, 30) }));
}

const store = configureStore();
setupStore(store);

const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));