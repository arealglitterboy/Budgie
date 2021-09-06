// console.log('Oh Hello There');

// const person = {
//     name: 'Ben',
//     age: 20,
//     location: {
//         city: 'Dublin',
//         temp: 20
//     }
// };

// console.log(`${person.name} is ${person.age}.`)

// const { name: firstName = 'Anonymous', age } = person;

// console.log(`${firstName} is ${age}.`);

// const { city, temp } = person.location;

// if (city && (temp || temp === 0)) {
//     console.log(`It's ${temp} in ${city}.`);
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName);

const address = ['78 Avoca Park', 'Blackrock', 'Co. Dublin', 'A94 T938'];
console.log(`You are in ${address[1]}, ${address[2]}.`);

const [street, city, county, eircode] = address;
console.log(`You are in ${city}, ${county}.`);


const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, , medium] = item;
console.log(`A medium ${itemName} costs ${medium}.`);