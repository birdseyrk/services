const express = require('express');
const bodyParser = require('body-parser');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const posts = {};

const uptimes = {};

app.get('/hoststatus', (req, res) => {

    console.log('Recieved Get hoststatus');
    res.send(posts);
});

app.post('/hoststatus', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { hostname } = req.body;

    console.log('Recieved hoststatus'); 

    posts[hostname] = {
        id, hostname
    };

    res.status(201).send(posts[hostname]);
});




app.get('/uptime', (req, res) => {

    console.log('Recieved Get uptime');
    res.send(uptimes);
});

app.post('/uptime', (req, res) => {
    const { hostname } = req.body;
    const { uptime } = req.body;
    const { lastupdate } = req.body;

    console.log('Recieved uptime [' + JSON.stringify(req.body) +']'); 

    uptimes[hostname] = {
        hostname, uptime, lastupdate
    };

    uptimes[hostname]

    res.status(201).send(uptimes[hostname]);
});



app.listen(8085, () => {
    console.log('Listening on 8085');
})