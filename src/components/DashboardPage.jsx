import React from 'react';

import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

// ? If this were a module based dashboard, then ExpenseListFilters would be inside a module with ExpenseList
const DashboardPage = () => (
    <main>
        <h1>Expenses</h1>
        <ExpenseListFilters />
        <ExpenseList />
    </main>
);

export default DashboardPage;