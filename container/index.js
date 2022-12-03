const express = require('express');
const bodyParser = require('body-parser');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const posts = {};

const myHosts = [];

myHosts["creede"]  = {"lastepoch":0, "status": "red","lastupdate":"1900-01-01:00:00:00"};
myHosts["creede1"] = {"lastepoch":0, "status": "red","lastupdate":"1900-01-01:00:00:00"};
myHosts["ubuntu1"] = {"lastepoch":0, "status": "red","lastupdate":"1900-01-01:00:00:00"};
myHosts["ubuntu2"] = {"lastepoch":0, "status": "red","lastupdate":"1900-01-01:00:00:00"};
myHosts["ubuntu3"] = {"lastepoch":0, "status": "red","lastupdate":"1900-01-01:00:00:00"};

/*
var testSleepES5 = function () {
    console.log('1');
    setTimeout(function () {
        console.log('2');
    }, 4000);
}

testSleepES5();
*/


const uptimes = {};
const svrhostname = {};
const svruptime = {};
const svrlastupdate = {};
const svrmeminfo = {};
const svrdiskinfo = {};
const svrcpuinfo = {};
const svrprocessinfo = {};

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
    myUptimes = {};

    for (let host in uptimes ) {

        myUptimes[host] = {"hostname":uptimes[host].hostname, "uptime":uptimes[host].uptime, "lastupdate":uptimes[host].lastupdate};
        console.log("=======================================================================");
        console.log(JSON.stringify(myUptime));
        //console.log(' uptime [ hostname:' + myUptimes[myUptime].hostname + ' uptime:'+  myUptimes[myUptime].uptime + ' lastupdate:'+  myUptimes[myUptime].lastupdate +']'); ;
        //console.log(JSON.stringify(uptimes[myUptime]));
    }
    console.log("Status myHosts " + JSON.stringify(myHosts));

    //res.send(hostname, uptime, lastupdate);
    res.send(JSON.stringify(myUptimes));
});

app.post('/uptime', (req, res) => {
    const { hostname } = req.body;
    const { uptime } = req.body;
    const { lastupdate } = req.body;
    const { epoch } = req.body;
    const { meminfo } = req.body;
    const { diskinfo } = req.body;
    const { cpuinfo } = req.body;
    const { processinfo } = req.body;
    myStatus = {};

    
    //console.log("=======================================================================");
    //console.log('Recieved uptime [' + JSON.stringify(req.body) +']'); 

    uptimes[hostname] = {
        hostname, uptime, lastupdate, epoch, meminfo, diskinfo, cpuinfo, processinfo
    };

    myHosts[hostname].lastepoch = uptimes[hostname].ephoc;
    myHosts[hostname].status = "green";
    myHosts[hostname].lastupdate = uptimes[hostname].lastupdate;

    console.log("=======================================================================");
    console.log('Hostname ===>' + JSON.stringify( uptimes[hostname].hostname) +'<==='); 
    console.log('uptime ===>' + JSON.stringify( uptimes[hostname].uptime) +'<==='); 
    console.log('lastupdate ===>' + JSON.stringify( uptimes[hostname].lastupdate) +'<==='); 
    console.log('epoch ===>' + JSON.stringify( uptimes[hostname].epoch) +'<==='); 
    //uptimes[hostname]
    myStatus = {"hostname":uptimes[hostname].hostname, "uptime":uptimes[hostname].uptime, "lastupdate":uptimes[hostname].lastupdate};
        
    //res.status(201).send(uptimes[hostname]);
    res.status(201).send(myStatus);
});  



app.listen(8085, () => {
    console.log('Listening on 8085');
})