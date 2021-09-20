import React from "react";
import { shallow } from "enzyme";

import ExpenseForm from "../../components/ExpenseForm";
import { expenses } from "../fixtures/expenses.fixture";

const getWrapper = (props = {}) => (shallow(<ExpenseForm {...props} />));

const simulateChange = (id, state, value, wrapper = getWrapper()) => {
    wrapper.find(`#${id}`).simulate('change', { target: { value } });
    expect(wrapper.state(state)).toBe(value);
    return wrapper;
};

test('should render expense form correctly', () => {
    // const wrapper = shallow(<ExpenseForm />);
    const wrapper = getWrapper({ today: new Date("2021-09-20T16:00:41.960Z") });
    expect(wrapper).toMatchSnapshot();
});

test('should render expense form with expense data', () => {
    const wrapper = getWrapper({ expense: expenses[0] });
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = getWrapper({ today: new Date("2021-09-20T16:00:41.990Z") });
    expect(wrapper).toMatchSnapshot(); // Check before the error

    wrapper.find('form').simulate('submit', { preventDefault: () => {} }); // Find the form, then simulate a submit event with an event object
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot(); // Check after the error
});

test('should set description on input change', () => {
    simulateChange('description', 'description', "description change");
});

test('should set note on text area change', () => {
    simulateChange('note', 'note', "note change");
});

test('should set amount if valid input', () => {
    simulateChange('amount', 'amount', '23.50');
})

test('should not set amount if not valid input', () => {
    const value = '23.50';
    const wrapper = simulateChange('amount', 'amount', value);
    wrapper.find('#amount').simulate('change', { target: { value: '23.50' } }); // Test/set amount with a valid amount
    expect(wrapper.state('amount')).toBe(value);
    
    wrapper.find('#amount').simulate('change', { target: { value: '-14.45' } }); // Test an invalid amount
    expect(wrapper.state('amount')).toBe(value);
    
    wrapper.find('#amount').simulate('change', { target: { value: "Hello World" } }); // Test an invalid value
    expect(wrapper.state('amount')).toBe(value);
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = getWrapper({ expense: expenses[0], onSubmit: onSubmitSpy });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state('error')).toBe('');
    const { description, amount, note, date, currency } = expenses[0];
    expect(onSubmitSpy).toHaveBeenLastCalledWith({ description, amount, note, date, currency });
});

test('should set new date on date changed', () => {
    const wrapper = getWrapper();
    const now = new Date();
    wrapper.find('#date-picker').prop('onChange')(now);
    expect(wrapper.state('date')).toEqual(now);
});