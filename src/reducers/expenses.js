const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter((e) => (e.id !== action.id));
        case 'EDIT_EXPENSE': // ? Map each value in the array into a new array, if the id matches the selected id map it with its new values
            return state.map((e) => ((e.id === action.id) ? {...e, ...action.updates} : {...e}));
        default:
            return state;
    }
};