const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
// Looks you can use this or cors() below.
// app.use((req, res, next) => {
//     res.setHeader('Acces-Control-Allow-Origin', '*');
//     res.setHeader('Acces-Control-Allow-Methods', 'POST, GET, OPTIONS');
//     res.setHeader('Access-COntrol-Allow-Headers', 'Content-Type, Authorization');
//     next();
// })

app.use(cors());

const posts = {};

const Server = {
    "hostname": "",  
    "lastupdate": "1970-01-01:00:00:00", 
    "epoch": "", 
    "uptime": ""
}

myInitialHosts = {};

myInitialNewHosts = {};
myInitialUptimes = {};

myInitialHosts["creede"]         = {"hostname": "creede",         "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} , "os" :{} };
myInitialHosts["creede02"]       = {"hostname": "creede02",      "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} , "os" :{} };
myInitialHosts["creede03"]       = {"hostname": "creede03",      "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} , "os" :{} };
myInitialHosts["ubuntu1"]        = {"hostname": "ubuntu1",        "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} , "os" :{} };
myInitialHosts["ubuntu2"]        = {"hostname": "ubuntu2",        "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} , "os" :{} };
myInitialHosts["ubuntu3"]        = {"hostname": "ubuntu3",        "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} , "os" :{} };
myInitialHosts["ansible-master"] = {"hostname": "ansible-master", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {}, "meminfo": {}, "diskinfo": {}, "cpuinfo": {}, "processinfo": {} , "os" :{} };

myInitialNewHosts["creede"]          = {"checksum":{}, "epoch":{}, "groups":{}, "hostname":"creede",         "lastupdate":"1970-01-01:00:00:00", "local":{}, "logavail":{}, "logpercent":{}, "logtotal":{}, "logused":{}, "memory":{}, "nodemanagers":{}, "opsavail":{}, "opspercent":{}, "opstotal":{}, "opsused":{}, "os":{}, "osversion":{}, "subagent":{}, "tmpavail":{}, "tmppercent":{}, "tmptotal":{}, "tmpused":{}, "uptime":{} };
myInitialNewHosts["creede02"]        = {"checksum":{}, "epoch":{}, "groups":{}, "hostname":"creede02",       "lastupdate":"1970-01-01:00:00:00", "local":{}, "logavail":{}, "logpercent":{}, "logtotal":{}, "logused":{}, "memory":{}, "nodemanagers":{}, "opsavail":{}, "opspercent":{}, "opstotal":{}, "opsused":{}, "os":{}, "osversion":{}, "subagent":{}, "tmpavail":{}, "tmppercent":{}, "tmptotal":{}, "tmpused":{}, "uptime":{} };
myInitialNewHosts["creede03"]        = {"checksum":{}, "epoch":{}, "groups":{}, "hostname":"creede03",       "lastupdate":"1970-01-01:00:00:00", "local":{}, "logavail":{}, "logpercent":{}, "logtotal":{}, "logused":{}, "memory":{}, "nodemanagers":{}, "opsavail":{}, "opspercent":{}, "opstotal":{}, "opsused":{}, "os":{}, "osversion":{}, "subagent":{}, "tmpavail":{}, "tmppercent":{}, "tmptotal":{}, "tmpused":{}, "uptime":{} };
myInitialNewHosts["ubuntu1"]         = {"checksum":{}, "epoch":{}, "groups":{}, "hostname":"ubuntu1",        "lastupdate":"1970-01-01:00:00:00", "local":{}, "logavail":{}, "logpercent":{}, "logtotal":{}, "logused":{}, "memory":{}, "nodemanagers":{}, "opsavail":{}, "opspercent":{}, "opstotal":{}, "opsused":{}, "os":{}, "osversion":{}, "subagent":{}, "tmpavail":{}, "tmppercent":{}, "tmptotal":{}, "tmpused":{}, "uptime":{} };
myInitialNewHosts["ubuntu2"]         = {"checksum":{}, "epoch":{}, "groups":{}, "hostname":"ubuntu2",        "lastupdate":"1970-01-01:00:00:00", "local":{}, "logavail":{}, "logpercent":{}, "logtotal":{}, "logused":{}, "memory":{}, "nodemanagers":{}, "opsavail":{}, "opspercent":{}, "opstotal":{}, "opsused":{}, "os":{}, "osversion":{}, "subagent":{}, "tmpavail":{}, "tmppercent":{}, "tmptotal":{}, "tmpused":{}, "uptime":{} };
myInitialNewHosts["ubuntu3"]         = {"checksum":{}, "epoch":{}, "groups":{}, "hostname":"ubuntu3",        "lastupdate":"1970-01-01:00:00:00", "local":{}, "logavail":{}, "logpercent":{}, "logtotal":{}, "logused":{}, "memory":{}, "nodemanagers":{}, "opsavail":{}, "opspercent":{}, "opstotal":{}, "opsused":{}, "os":{}, "osversion":{}, "subagent":{}, "tmpavail":{}, "tmppercent":{}, "tmptotal":{}, "tmpused":{}, "uptime":{} };
myInitialNewHosts["ansible-master"]  = {"checksum":{}, "epoch":{}, "groups":{}, "hostname":"ansible-master", "lastupdate":"1970-01-01:00:00:00", "local":{}, "logavail":{}, "logpercent":{}, "logtotal":{}, "logused":{}, "memory":{}, "nodemanagers":{}, "opsavail":{}, "opspercent":{}, "opstotal":{}, "opsused":{}, "os":{}, "osversion":{}, "subagent":{}, "tmpavail":{}, "tmppercent":{}, "tmptotal":{}, "tmpused":{}, "uptime":{} };

// myInitialUptimes["creede"]  = {"hostname": "creede",  "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} };
// myInitialUptimes["creede1"] = {"hostname": "creede1", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} };
// myInitialUptimes["ubuntu1"] = {"hostname": "ubuntu1", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} };
// myInitialUptimes["ubuntu2"] = {"hostname": "ubuntu2", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} };
// myInitialUptimes["ubuntu3"] = {"hostname": "ubuntu3", "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} };

myInitialUptimes  = [
    {"hostname": "creede",           "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} },
    {"hostname": "creede02",         "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} },
    {"hostname": "creede03",         "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} },
    {"hostname": "ubuntu1",          "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} },
    {"hostname": "ubuntu2",          "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} },
    {"hostname": "ubuntu3",          "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} },
    {"hostname": "ansible-master",   "lastupdate": "1970-01-01:00:00:00", "epoch": {}, "uptime": {} }
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


uptimes = {};
const hostStatus = {};
const newhostStatus = {};
const svrhostname = {};
const svruptime = {};
const svrlastupdate = {};
const svrmeminfo = {};
const svrdiskinfo = {};
const svrcpuinfo = {};
const svrprocessinfo = {};

var exec = require('child_process').exec;



app.get('/newhoststatus', (req, res) => {

    console.log('<========== Get newhoststatus ==========>');
    myStatus = myInitialNewHosts;
    
    for (let host in newhostStatus ) {
        
        myStatus[host] = {
            "checksum":newhostStatus[host].checksum, 
            "epoch":newhostStatus[host].epoch, 
            "groups":newhostStatus[host].groups, 
            "hostname":newhostStatus[host].hostname, 
            "lastupdate":newhostStatus[host].lastupdate, 
            "local":newhostStatus[host].local, 
            "logavail":newhostStatus[host].logavail, 
            "logpercent":newhostStatus[host].logpercent,
        
            "logtotal":newhostStatus[host].logtotal,
            "logused":newhostStatus[host].logused,
            "memory":newhostStatus[host].memory,
            "nodemanagers":newhostStatus[host].nodemanagers,
            "opsavail":newhostStatus[host].opsavail,
            "opspercent":newhostStatus[host].opspercent,
            "opstotal":newhostStatus[host].opstotal,
            "opsused":newhostStatus[host].opsused,
            "os":newhostStatus[host].os,

            "osversion":newhostStatus[host].osversion,
            "subagent":newhostStatus[host].subagent,
            "tmpavail":newhostStatus[host].tmpavail,
            "tmppercent":newhostStatus[host].tmppercent,
            "tmptotal":newhostStatus[host].tmptotal,
            "tmpused":newhostStatus[host].tmpused,
            "uptime":newhostStatus[host].uptime
        };
        
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    res.send(myStatus);
});

app.post('/newhostStatus', (req, res) => {

    // serverstatus: {
    //         "hostname":"{{inventory_hostname}}", 
    //     "os":"{{myDistribution}}", 
    //     "osversion":"{{ansible_facts.distribution_version}}",
    //     "groups":"{{myGroups}}", 
    //     "local":"{{myLocal}}",
    //     "uptime":"{{uptime.stdout}}",
    //     "memory":"{{myMemory}}",
    //     "lastUpdate":"{{lastUpdate}}",
    //     "epoch":"{{myEpoch}}",
    //     "subagent":"{{mySubagent}}",
    //     "nodemanagers":"{{myNodeManager}}",
    //     "checksum":"{{checksums.results}}",
    //     "opstotal":"{{opsdisk.size_total|filesizeformat(True)}}",
    //     "opsavail":"{{opsdisk.size_available|filesizeformat(True)}}",
    //     "opsused":"{{opsused|filesizeformat(True)}} ",
    //     "opspercent":"{{opspercent}}%",
        
    //     "logtotal":"{{logdisk.size_total|filesizeformat(True)}}",
    //     "logavail":"{{logdisk.size_available|filesizeformat(True)}}",
    //     "logused":"{{logused|filesizeformat(True)}}",
    //     "logpercent":"{{logpercent}}%",
        
    //     "tmptotal":"{{tmpdisk.size_total|filesizeformat(True)}}",
    //     "tmpavail":"{{tmpdisk.size_available|filesizeformat(True)}}",
    //     "tmpused":"{{tmpused|filesizeformat(True)}}",
    //     "tmppercent":"{{tmppercent}}%",
    //     }
    
    const { hostname } = req.body;
    const { os } = req.body;
    const { osversion } = req.body;
    const { groups } = req.body;
    const { local } = req.body;
    const { uptime } = req.body;
    const { memory } = req.body;
    const { lastupdate } = req.body;
    const { epoch } = req.body;
    const { subagent } = req.body;
    const { nodemanagers } = req.body;
    const { checksum } = req.body;

    const { opstotal } = req.body;
    const { opsavail } = req.body;
    const { opsused } = req.body;
    const { opspercent } = req.body;
    
    const { logtotal } = req.body;
    const { logavail } = req.body;
    const { logused } = req.body;
    const { logpercent } = req.body;
    
    const { tmptotal } = req.body;
    const { tmpavail } = req.body;
    const { tmpused } = req.body;
    const { tmppercent } = req.body;

    console.log('<==========  Post newhoststatus ' + hostname + '==========>'); 

    newhostStatus[hostname] = {
        checksum, cpuinfo, epoch, groups, hostname, lastupdate, local, logavail, logpercent, logtotal, logused, memory, nodemanagers, opsavail, opspercent, opstotal, opsused, os, osversion, processinfo, subagent, tmpavail, tmppercent, tmptotal, tmpused, uptime
    };

    console.log('Hostname ===>' + JSON.stringify( newhostStatus[hostname].hostname) +'<==='); 
    console.log('os ===>' + JSON.stringify( newhostStatus[hostname].os) +'<==='); 
    console.log('osversion ===>' + JSON.stringify( newhostStatus[hostname].osversion) +'<==='); 
    console.log('local ===>' + JSON.stringify( newhostStatus[hostname].local) +'<==='); 
    console.log('uptime ===>' + JSON.stringify( newhostStatus[hostname].uptime) +'<==='); 
    console.log('memory ===>' + JSON.stringify( newhostStatus[hostname].memory) +'<==='); 
    console.log('cpuinfo ===>' + JSON.stringify( newhostStatus[hostname].cpuinfo) +'<==='); 
    console.log('processinfo ===>' + JSON.stringify( newhostStatus[hostname].processinfo) +'<==='); 
    console.log('lastupdate ===>' + JSON.stringify( newhostStatus[hostname].lastupdate) +'<==='); 
    console.log('epoch ===>' + JSON.stringify( newhostStatus[hostname].epoch) +'<==='); 
    console.log('subagent ===>' + JSON.stringify( newhostStatus[hostname].subagent) +'<==='); 
    console.log('nodemanagers ===>' + JSON.stringify( newhostStatus[hostname].nodemanagers) +'<==='); 
    console.log('checksum ===>' + JSON.stringify( newhostStatus[hostname].checksum) +'<==='); 
    console.log('opstotal ===>' + JSON.stringify( newhostStatus[hostname].opstotal) +'<==='); 
    console.log('opsavail ===>' + JSON.stringify( newhostStatus[hostname].opsavail) +'<==='); 
    console.log('opsused ===>' + JSON.stringify( newhostStatus[hostname].opsused) +'<==='); 
    console.log('opspercent ===>' + JSON.stringify( newhostStatus[hostname].opspercent) +'<==='); 
    console.log('logtotal ===>' + JSON.stringify( newhostStatus[hostname].logtotal) +'<==='); 
    console.log('logavail ===>' + JSON.stringify( newhostStatus[hostname].logavail) +'<==='); 
    console.log('logused ===>' + JSON.stringify( newhostStatus[hostname].logused) +'<==='); 
    console.log('logpercent ===>' + JSON.stringify( newhostStatus[hostname].logpercent) +'<==='); 
    console.log('tmptotal ===>' + JSON.stringify( newhostStatus[hostname].tmptotal) +'<==='); 
    console.log('tmpavail ===>' + JSON.stringify( newhostStatus[hostname].tmpavail) +'<==='); 
    console.log('tmpused ===>' + JSON.stringify( newhostStatus[hostname].tmpused) +'<==='); 
    console.log('tmppercent ===>' + JSON.stringify( newhostStatus[hostname].tmppercent) +'<==='); 
    console.log("=======================================================================");
    
    res.status(201).send(hostname);
});

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
        //console.log(" adding " + host);

        const myServer = {};
        myServer.hostname = uptimes[host].hostname;
        myServer.uptime = uptimes[host].uptime;
        myServer.lastupdate = uptimes[host].lastupdate;
        myServer.epoch = uptimes[host].epoch;

        //console.log("my server " + JSON.stringify(myServer));
        myUptimes .push(myServer);

        //myUptimes .push( new {"hostname":uptimes[host].hostname, "uptime":uptimes[host].uptime, "lastupdate":uptimes[host].lastupdate, "epoch":uptimes[host].epoch});
       
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");

    }

    //console.log(JSON.stringify(myUptimes));
    res.send(myUptimes);
});

app.get('/uptime/:host', (req, res) => {

    console.log('<==========  Get uptime by Host ==========>');
    host = req.params.host;
    //console.log(host);
    res.send(uptimes[host]);
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
    
    for (let host in newhostStatus ) {
        //myStatus[host] = {"hostname":hostStatus[host].hostname, "lastupdate":hostStatus[host].lastupdate, "epoch":hostStatus[host].epoch, "uptime":hostStatus[host].uptime, "meminfo":hostStatus[host].meminfo};
        myStatus[host] = {"hostname":newhostStatus[host].hostname, "lastupdate":newhostStatus[host].lastupdate, "epoch":newhostStatus[host].epoch, "uptime":newhostStatus[host].uptime, "meminfo":newhostStatus[host].memory};
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    //console.log(JSON.stringify(myStatus));
    res.send(myStatus);
});

app.get('/meminfo/:host', (req, res) => {

    console.log('<==========  Get meminfo by Host ==========>');
    host = req.params.host;
    //console.log(host);
    res.send(newhostStatus[host].memory);
});

app.get('/os', (req, res) => {

    console.log('<========== Get os Information ==========>');
    myStatus = {};
    
    for (let host in newhostStatus ) {
        myStatus[host] = {"hostname":newhostStatus[host].hostname, "os":newhostStatus[host].os, "osversion":newhostStatus[host].osversion};
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    //console.log(JSON.stringify(myStatus));
    res.send(myStatus);
});

app.get('/os/:host', (req, res) => {

    console.log('<==========  Get os by Host  ==========>');
    host = req.params.host;
    console.log(host);
    res.send({"hostname":newhostStatus[host].hostname, "os":newhostStatus[host].os, "osversion":newhostStatus[host].osversion});
});

app.get('/diskinfo', (req, res) => {

    console.log('<========== Get Disk Information ==========>');
    myStatus = {};
    
    for (let host in newhostStatus ) {
        //myStatus[host] = {"hostname":hostStatus[host].hostname, "lastupdate":hostStatus[host].lastupdate, "epoch":hostStatus[host].epoch, "uptime":hostStatus[host].uptime, "diskinfo":hostStatus[host].diskinfo};
        myStatus[host] = {"hostname":newhostStatus[host].hostname, "lastupdate":newhostStatus[host].lastupdate, "epoch":newhostStatus[host].epoch, "uptime":newhostStatus[host].uptime, "opstotal":newhostStatus[host].opstotal, "opsavail":newhostStatus[host].opsavail, "opsused":newhostStatus[host].opsused, "opspercent":newhostStatus[host].opspercent, "logtotal":newhostStatus[host].logtotal, "logavail":newhostStatus[host].logavail, "logused":newhostStatus[host].logused, "logpercent":newhostStatus[host].logpercent, "tmptotal":newhostStatus[host].tmptotal, "tmpavail":newhostStatus[host].tmpavail, "tmpused":newhostStatus[host].tmpused, "tmppercent":newhostStatus[host].tmppercent};
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    //console.log(JSON.stringify(myStatus));
    res.send(myStatus);
});

app.get('/diskinfo/:host', (req, res) => {

    console.log('<==========  Get diskinfo by Host ==========>');
    host = req.params.host;
    //console.log(host);
    //res.send(hostStatus[host].diskinfo);
    res.send({"opstotal":newhostStatus[host].opstotal, "opsavail":newhostStatus[host].opsavail, "opsused":newhostStatus[host].opsused, "opspercent":newhostStatus[host].opspercent, "logtotal":newhostStatus[host].logtotal, "logavail":newhostStatus[host].logavail, "logused":newhostStatus[host].logused, "logpercent":newhostStatus[host].logpercent, "tmptotal":newhostStatus[host].tmptotal, "tmpavail":newhostStatus[host].tmpavail, "tmpused":newhostStatus[host].tmpused, "tmppercent":newhostStatus[host].tmppercent});
});

app.get('/cpuinfo', (req, res) => {

    console.log('<========== Get CPU Information ==========>');
    myStatus = {};
    
    for (let host in newhostStatus ) {
        myStatus[host] = {"hostname":newhostStatus[host].hostname, "lastupdate":newhostStatus[host].lastupdate, "epoch":newhostStatus[host].epoch, "uptime":newhostStatus[host].uptime, "cpuinfo":newhostStatus[host].cpuinfo};
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    //console.log(JSON.stringify(myStatus));
    res.send(myStatus);
});

app.get('/cpuinfo/:host', (req, res) => {

    console.log('<==========  Get diskinfo by Host ==========>');
    host = req.params.host;
    //console.log(host);
    res.send(newhostStatus[host].cpuinfo);
});

app.get('/processinfo', (req, res) => {

    console.log('<========== Get Process Information ==========>');
    myStatus = {};
    
    for (let host in newhostStatus ) {
        //myStatus[host] = {"hostname":hostStatus[host].hostname, "lastupdate":hostStatus[host].lastupdate, "epoch":hostStatus[host].epoch, "uptime":hostStatus[host].uptime, "processinfo":hostStatus[host].processinfo};
        myStatus[host] = {"newhostStatus":newhostStatus[host].hostname, "lastupdate":newhostStatus[host].lastupdate, "epoch":newhostStatus[host].epoch, "uptime":newhostStatus[host].uptime, "processinfo":newhostStatus[host].processinfo};
        //console.log(JSON.stringify(myUptimes));
        //console.log("=======================================================================");
        
    }

    //console.log(JSON.stringify(myStatus));
    res.send(myStatus);
});

app.get('/processinfo/:host', (req, res) => {

    console.log('<==========  Get processinfo by Host ==========>');
    host = req.params.host;
    //console.log(host);
    res.send(newhostStatus[host].processinfo);
});

app.listen(8085, () => {
    console.log('Listening on 8085');
})