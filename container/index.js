const express = require('express');
const bodyParser = require('body-parser');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const epochNow = Math.round(Date.now() / 1000);

const posts = {};

myHosts = {};

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
const hostStatus = {};
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
    
    for (let host in hostStatus ) {
        myUptimes[host] = {"hostname":hostStatus[host].hostname, "uptime":hostStatus[host].uptime, "lastupdate":hostStatus[host].lastupdate, "epoch":hostStatus[host].epoch};
        console.log("=======================================================================");
        console.log(JSON.stringify(myUptimes));
        //console.log(' uptime [ hostname:' + myUptimes[myUptime].hostname + ' uptime:'+  myUptimes[myUptime].uptime + ' lastupdate:'+  myUptimes[myUptime].lastupdate +']'); ;
        //console.log(JSON.stringify(hostStatus[myUptime]));
    }
    console.log("Status myHosts " + JSON.stringify(myHosts));

    //res.send(hostname, uptime, lastupdate);
    res.send(JSON.stringify(myUptimes));

    res.send(posts);
});

app.post('/hoststatus', (req, res) => {

    console.log('Recieved hoststatus'); 
    const { hostname } = req.body;
    const { uptime } = req.body;
    const { lastupdate } = req.body;
    const { epoch } = req.body;
    const { meminfo } = req.body;
    const { diskinfo } = req.body;
    const { cpuinfo } = req.body;
    const { processinfo } = req.body;

    hostStatus[hostname] = {
        hostname, uptime, lastupdate, epoch, meminfo, diskinfo, cpuinfo, processinfo
    };

    console.log("=======================================================================");
    console.log('Hostname ===>' + JSON.stringify( hostStatus[hostname].hostname) +'<==='); 
    console.log('uptime ===>' + JSON.stringify( hostStatus[hostname].uptime) +'<==='); 
    console.log('lastupdate ===>' + JSON.stringify( hostStatus[hostname].lastupdate) +'<==='); 
    console.log('epoch ===>' + JSON.stringify( hostStatus[hostname].epoch) +'<==='); 
    
    myStatus = {"hostname":hostStatus[hostname].hostname, "uptime":hostStatus[hostname].uptime, "lastupdate":hostStatus[hostname].lastupdate, "epoch":hostStatus[hostname].epoch};

    res.status(201).send(myStatus);
});


app.get('/uptime', (req, res) => {

    console.log('Recieved Get uptime');
    myUptimes = {};
    
    for (let host in uptimes ) {
        myUptimes[host] = {"hostname":uptimes[host].hostname, "uptime":uptimes[host].uptime, "lastupdate":uptimes[host].lastupdate, "epoch":uptimes[host].epoch};
        console.log("=======================================================================");
        console.log(JSON.stringify(myUptimes));
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
    myStatus = {"hostname":uptimes[hostname].hostname, "uptime":uptimes[hostname].uptime, "lastupdate":uptimes[hostname].lastupdate, "epoch":uptimes[hostname].epoch};
        
    //res.status(201).send(uptimes[hostname]);
    res.status(201).send(myStatus);
});  



app.listen(8085, () => {
    console.log('Listening on 8085');
})