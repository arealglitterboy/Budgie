import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ContactsDirectory from '../components/ContactsDirectory';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import ModalTest from '../components/ModalTest';

const AppRouter = () => (
    <BrowserRouter>
        <>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/contacts" component={ContactsDirectory} />
                <Route path="/modal" component={ModalTest} />
                <Route path="/edit/:expenseId" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </>
    </BrowserRouter>
);

export default AppRouter;