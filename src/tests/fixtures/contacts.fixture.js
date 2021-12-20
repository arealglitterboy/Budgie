const createContact = (id, name, categories, date) => ({id, name, categories, date});

export const contacts = [
    createContact('124', 'Mark Matthews', ['Friend', 'Coworker'], new Date('2021-10-10')),
    createContact('1642', 'Alex Vincent', ['Rent', 'Landlord'], new Date('2019-01-08')),
    createContact('764', 'Bank Of Ireland', ['Bank', 'Credit Card'], new Date('2018-04-09'))
];