import React from "react";
import { shallow } from "enzyme";

import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters.fixture";
import moment from "moment";

let setFilterTerm, setSortBy, setEndDate, setStartDate, wrapper;

beforeEach(() => {
    setFilterTerm = jest.fn();
    setSortBy = jest.fn();
    setEndDate = jest.fn();
    setStartDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters
        filters={filters}
        setFilterTerm={setFilterTerm}
        setSortBy={setSortBy}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
    />);
});

test('should render expense list filters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render expense list filters with alt data correctly', () => {
    wrapper.setProps({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
});

test('should handle filter term change', () => {
    const value = 'new search';
    wrapper.find('#search-term').simulate('change', { target: { value } });
    expect(setFilterTerm).toHaveBeenLastCalledWith(value);
});

test('should change sort', () => {
    const select = wrapper.find('#sort-expenses');
    const sorts = ['byOldest', 'byAmountDescending', 'byAmountAscending'];
    
    for (let value of sorts) {
        select.simulate('change', { target: { value } });
        expect(setSortBy).toHaveBeenLastCalledWith(value);
    }
});

test('should handle date change', () => {
    const change = { startDate: moment("2021-01-04"), endDate: moment("2021-05-09")};
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(change);
    expect(setStartDate).toHaveBeenLastCalledWith(change.startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(change.endDate);
});

test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});