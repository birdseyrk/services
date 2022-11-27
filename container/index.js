const express = require('express');
const bodyParser = require('body-parser');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {

    console.log('Recieved Get');
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { hostname } = req.body;

    console.log('Recieved Post'); 

    posts[id] = {
        id, hostname
    };

    res.status(201).send(posts[id]);
});

app.listen(8085, () => {
    console.log('Listening on 8085');
})