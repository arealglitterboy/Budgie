import React from "react";
import { shallow } from "enzyme";

import { expenses } from "../fixtures/expenses.fixture";
import ExpenseListItem from "../../components/ExpenseListItem";

test('should render Expense List Item with expense details', () => {
    const wrapper = shallow(<ExpenseListItem { ...expenses[0] } today={new Date('2021-09-12')} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Expense List Item with expense details and different category', () => {
    const wrapper = shallow(<ExpenseListItem { ...expenses[2] } today={new Date('2021-09-12')} />)
    expect(wrapper).toMatchSnapshot();
});