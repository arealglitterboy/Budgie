import React from "react";
import { shallow } from "enzyme";

import { expenses } from "../fixtures/expenses.fixture";
import { ExpenseList } from "../../components/ExpenseList"; // unconnected version of ExpenseList component

// Expenses in expense list
test('should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});

// No expenses
test('should render empty ExpenseList, empty array', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render empty ExpenseList, no props', () => {
    const wrapper = shallow(<ExpenseList />);
    expect(wrapper).toMatchSnapshot();
});