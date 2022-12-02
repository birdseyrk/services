const express = require('express');
const bodyParser = require('body-parser');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const posts = {};

const uptimes = {};

var exec = require('child_process').exec;

app.get('/hoststatus', (req, res) => {

    console.log('Recieved Get hoststatus');

    exec("ls -la", (error, stdout, stderr) => {
    //exec("hostname; /usr/bin/ansible-playbook /local/ansible/tests/webcalls/upTimeWebCall.yml", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    exec("hostname", (error, stdout, stderr) => {
    //exec("hostname; /usr/bin/ansible-playbook /local/ansible/tests/webcalls/upTimeWebCall.yml", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    exec("which ansible-playbook", (error, stdout, stderr) => {
    //exec("hostname; /usr/bin/ansible-playbook /local/ansible/tests/webcalls/upTimeWebCall.yml", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

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
    const { meminfo } = req.body;
    const { diskinfo } = req.body;
    const { cpuinfo } = req.body;
    const { processinfo } = req.body;

    console.log('Recieved uptime [' + JSON.stringify(req.body) +']'); 

    uptimes[hostname] = {
        hostname, uptime, lastupdate, meminfo, diskinfo, cpuinfo, processinfo
    };

    uptimes[hostname]

    res.status(201).send(uptimes[hostname]);
});



app.listen(8085, () => {
    console.log('Listening on 8085');
})