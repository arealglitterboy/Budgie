const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_CONTACT':
            return [...state, action.contact];
        case 'REMOVE_CONTACT':
            return state.filter((contact) => (contact.id !== action.id));
        case 'EDIT_CONTACT': // ? Map each value in the array into a new array, if the id matches the selected id map it with its new values
            return state.map((contact) => ((contact.id === action.id) ? {...contact, ...action.updates, id: action.id } : {...contact}));
        default:
            return state;
    }
};