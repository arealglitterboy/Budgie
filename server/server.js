const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath)); // * Serve request from public path

app.get('*', (request, response) => {
    response.sendFile(path.join(publicPath, 'index.html'));
}); // * When the request cannot be found, serve index.html in the public path

app.listen(3000, () => {
    console.log('Server is running');
});