export const isValidDate = (date) => (date instanceof Date && !isNaN(date));

export const isAfterDate = (control, date) => (control <= date);