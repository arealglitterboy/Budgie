import React from "react";
import { shallow } from "enzyme";

import { expenses } from "../fixtures/expenses.fixture";
import ExpenseListItem from "../../components/ExpenseListItem";

test('should render Expense List Item with expense details', () => {
    const wrapper = shallow(<ExpenseListItem { ...expenses[0] } />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Expense List Item with expense details and different currency', () => {
    const wrapper = shallow(<ExpenseListItem { ...expenses[2] } />)
    expect(wrapper).toMatchSnapshot();
});