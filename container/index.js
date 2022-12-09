const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

myInitialHosts = {};
myInitialUptimes = {};

myInitialHosts["creede"]  = {"hostname": "creede",  "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} };
myInitialHosts["creede1"] = {"hostname": "creede1", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} };
myInitialHosts["ubuntu1"] = {"hostname": "ubuntu1", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} };
myInitialHosts["ubuntu2"] = {"hostname": "ubuntu2", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} };
myInitialHosts["ubuntu3"] = {"hostname": "ubuntu3", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} };


// myInitialUptimes["creede"]  = {"hostname": "creede",  "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} };
// myInitialUptimes["creede1"] = {"hostname": "creede1", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} };
// myInitialUptimes["ubuntu1"] = {"hostname": "ubuntu1", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} };
// myInitialUptimes["ubuntu2"] = {"hostname": "ubuntu2", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} };
// myInitialUptimes["ubuntu3"] = {"hostname": "ubuntu3", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} };

myInitialUptimes  = [
    {"hostname": "creede",  "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} },
    {"hostname": "ubuntu1", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} },
    {"hostname": "ubuntu2", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} },
    {"hostname": "ubuntu3", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} }
];


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

    console.log('<========== Get hoststatus ==========>');
    myStatus = myInitialHosts;
    
    for (let host in hostStatus ) {
        
        myStatus[host] = {"hostname":hostStatus[host].hostname, "lastupdate":hostStatus[host].lastupdate, "epoch":hostStatus[host].epoch, "uptime":hostStatus[host].uptime, "meminfo":hostStatus[host].meminfo, "diskinfo":hostStatus[host].diskinfo, "cpuinfo":hostStatus[host].cpuinfo, "processinfo":hostStatus[host].processinfo};
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    res.send(myStatus);
});

app.post('/hoststatus', (req, res) => {
    
    const { hostname } = req.body;
    const { uptime } = req.body;
    const { lastupdate } = req.body;
    const { epoch } = req.body;
    const { meminfo } = req.body;
    const { diskinfo } = req.body;
    const { cpuinfo } = req.body;
    const { processinfo } = req.body;

    console.log('<==========  Post hoststatus ' + hostname + '==========>'); 

    hostStatus[hostname] = {
        hostname, lastupdate, epoch, uptime, meminfo, diskinfo, cpuinfo, processinfo
    };

    // console.log('Hostname ===>' + JSON.stringify( hostStatus[hostname].hostname) +'<==='); 
    // console.log('uptime ===>' + JSON.stringify( hostStatus[hostname].uptime) +'<==='); 
    // console.log('lastupdate ===>' + JSON.stringify( hostStatus[hostname].lastupdate) +'<==='); 
    // console.log('epoch ===>' + JSON.stringify( hostStatus[hostname].epoch) +'<==='); 
    // console.log("=======================================================================");
    
    res.status(201).send(hostname);
});


app.get('/uptime', (req, res) => {

    console.log('<==========  Get uptime ==========>');
    //myUptimes = myInitialUptimes;
    myUptimes = [];
    

    for (let host in  uptimes) {
        console.log(" adding " + host);
        myUptimes.push = {"hostname":uptimes[host].hostname, "uptime":uptimes[host].uptime, "lastupdate":uptimes[host].lastupdate, "epoch":uptimes[host].epoch};
       
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");

    }

    console.log(JSON.stringify(myUptimes));
    res.send(myUptimes);
});

app.post('/uptime', (req, res) => {

    const { hostname } = req.body;
    const { uptime } = req.body;
    const { lastupdate } = req.body;
    const { epoch } = req.body;

    console.log('<==========  Post uptime ' + hostname + ' ==========>');

    uptimes[hostname] = {
         hostname, uptime, lastupdate, epoch
    };

    console.log('Hostname ===>' + JSON.stringify( uptimes[hostname].hostname) +'<==='); 
    console.log('uptime ===>' + JSON.stringify( uptimes[hostname].uptime) +'<==='); 
    console.log('lastupdate ===>' + JSON.stringify( uptimes[hostname].lastupdate) +'<==='); 
    console.log('epoch ===>' + JSON.stringify( uptimes[hostname].epoch) +'<==='); 
    console.log("=======================================================================");
     
    res.status(201).send(hostname);
});

app.delete('/uptime', (req, res) => {

    console.log('<==========  Delete uptime ==========>');
    uptimes = {};
     
    res.status(201).send(uptimes);
});

app.get('/meminfo', (req, res) => {

    console.log('<========== Get Memory Information ==========>');
    myStatus = {};
    
    for (let host in hostStatus ) {
        myStatus[host] = {"hostname":hostStatus[host].hostname, "lastupdate":hostStatus[host].lastupdate, "epoch":hostStatus[host].epoch, "uptime":hostStatus[host].uptime, "meminfo":hostStatus[host].meminfo};
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    //console.log(JSON.stringify(myStatus));
    res.send(myStatus);
});

app.get('/diskinfo', (req, res) => {

    console.log('<========== Get Disk Information ==========>');
    myStatus = {};
    
    for (let host in hostStatus ) {
        myStatus[host] = {"hostname":hostStatus[host].hostname, "lastupdate":hostStatus[host].lastupdate, "epoch":hostStatus[host].epoch, "uptime":hostStatus[host].uptime, "diskinfo":hostStatus[host].diskinfo};
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    //console.log(JSON.stringify(myStatus));
    res.send(myStatus);
});

app.get('/cpuinfo', (req, res) => {

    console.log('<========== Get CPU Information ==========>');
    myStatus = {};
    
    for (let host in hostStatus ) {
        myStatus[host] = {"hostname":hostStatus[host].hostname, "lastupdate":hostStatus[host].lastupdate, "epoch":hostStatus[host].epoch, "uptime":hostStatus[host].uptime, "cpuinfo":hostStatus[host].cpuinfo};
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    //console.log(JSON.stringify(myStatus));
    res.send(myStatus);
});

app.get('/processinfo', (req, res) => {

    console.log('<========== Get Process Information ==========>');
    myStatus = {};
    
    for (let host in hostStatus ) {
        myStatus[host] = {"hostname":hostStatus[host].hostname, "lastupdate":hostStatus[host].lastupdate, "epoch":hostStatus[host].epoch, "uptime":hostStatus[host].uptime, "processinfo":hostStatus[host].processinfo};
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    //console.log(JSON.stringify(myStatus));
    res.send(myStatus);
});

app.listen(8085, () => {
    console.log('Listening on 8085');
})