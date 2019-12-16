const cluster = require('cluster');
const path = require('path').posix;
const superagent = require('superagent');
const Request = require('../Request/request');
const url = require('url');

function multiProcess() {
    this.requestQ = [];
    this.filelist = [];
    this.node = [];

    this.addRequest =function(request){
        this.requestQ.push(request);
    };

    this.addRequestArray =function(requestArray){
        this.requestQ = requestArray;
    };

    //TODO read status
    this.execute = function (processNum,callback) {
        if(cluster.isMaster) {
            let start = Date.now();
            console.log("Start Sending");
            let queue = [];
            let account = 0;
            let requestQ =this.requestQ;
            let node = this.node;

            //TODO add node list
            while(account < processNum && requestQ.length > 0){
                if(Object.keys(cluster.workers).length <= processNum){
                    let worker = cluster.fork();
                    worker.on('message', function(message) {
                        console.log('Process ' + this.process.pid + '  has retrieved a new response.');
                        queue[message[2]] = message;
                        if(requestQ.length>0){
                            worker.send([account,requestQ.pop(),node]);
                        }else {
                            this.destroy();
                        }
                    });
                    worker.send([account,requestQ.pop(),node]);
                    account++;
                }
                console.log('core number: ',account);
            }
            cluster.on('exit', function(worker) {
                // When the master has no more workers alive it
                // prints the elapsed time and then kills itself
                if (Object.keys(cluster.workers).length === 0 && requestQ.length === 0) {
                    // console.log(JSON.stringify(queue));
                    console.log('Elapsed Time: ' + (Date.now() - start) + 'ms');
                    // return queue;
                    // process.exit(1);
                    // return new Promise(function (resolve,reject) {
                    //     resolve(queue);
                    // });
                    callback(queue);
                }
            });
        } else{
            process.on('message', function(message) {
                // console.log('Process ' + message[0] + '  is starting to work.');
                // console.log('Request: ',message[1]);
                let node = message[2];
                let address = message[1]['targetAddress'];
                let type = message[1]['type'];
                // console.log(message[1]['data'][0]['chunk'])
                // process.send([]);
                // Send request
                if(type === 'update'){
                    console.log('File ID',path.join(message[1]['data'][0]['appName'],message[1]['data'][0]['filename']))
                    superagent.post(address+'/addFile')
                        .query()
                        .send(
                            {
                                'fileId':path.join(message[1]['data'][0]['appName'],message[1]['data'][0]['filename']),
                                'content':message[1]['data'][0]['chunk'],
                                'size':message[1]['data'][0]['chunk'].length
                            }
                        )
                        .then(res => {
                            console.log(res.status);
                            process.send([type,res.body,path.basename(message[1]['data'][0]['filename'])]);
                        },err =>{
                            console.log(err.status);
                            process.send(["error",err.message,path.basename(message[1]['data'][0]['filename'])]);
                        });
                }else if(type === 'read'){
                    console.log('Read Start');
                    superagent.get(address+'/getFile')
                        .query({'fileId':path.join(message[1]['data'][0]['appName'],message[1]['data'][0]['filename'])})
                        .then(res => {
                            // console.log('Get Data', res.body);
                            process.send([type,res.body,path.basename(message[1]['data'][0]['filename'])]);
                        }, err =>{
                            console.log(err.status);
                            process.send(["error",err.message,path.basename(message[1]['data'][0]['filename'])]);
                        });
                }else if(type === 'delete'){
                    superagent.delete(url.resolve(address,'getFile'))
                        .query({'fileId':path.join(message[1]['data'][0]['appName'],message[1]['data'][0]['filename'])})
                        .end(function (res){
                            process.send([type,res.ok,res.body,path.basename(message[1]['data'][0]['filename'])]);
                        });
                }
            });
        }
    }
}

module.exports = multiProcess;