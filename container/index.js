const express = require('express');
const bodyParser = require('body-parser');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get('/hoststatus', (req, res) => {

    console.log('Recieved Get hoststatus');
    res.send(posts);
});

app.post('/hoststatus', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { hostname } = req.body;

    console.log('Recieved Host Status'); 

    posts[id] = {
        id, hostname
    };

    res.status(201).send(posts[id]);
});

app.listen(8085, () => {
    console.log('Listening on 8085');
})