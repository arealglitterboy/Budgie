export const option = (value, label) => ({ value, label });

export const expenseSortOptions = [
    option('byNewest', 'By Newest'),
    option('byOldest', 'By Oldest'),
    option('byAmountDescending', 'Amount Descending'),
    option('byAmountAscending', 'Amount Ascending'),
    option('byTitleDescending', 'Title Descending'),
    option('byTitleAscending', 'Title Ascending')
];

export const categoryOptions = [
    option('food', '🍔'),
    option('shopping', '🛍️'),
    option('going out', '🕺🏼'),
    option('clothes', '🕴🏼'),
    option('tech', '🖥️'),
    option('gift', '🎁'),
    option('pay', '💸'),
    option('rent', '🏡'),
    option('household', '🧻'),
    option('groceries', '🛒'),
    option('work', '🏢'),
    option('odd-job', '🧑🏼‍🔧'),
    option('family', '👨‍👩‍👧‍👦'),
];

export const contactToOption = ({id: value, name: label}) => ({ label, value });