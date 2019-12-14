const cluster = require('cluster');
const path = require('path');
const Request = require('../Request/request');

function multiProcess() {
    this.requestQ = [];
    this.responseQ = [];
    this.filelist = [];
    this.node = [];

    this.addRequest =function(request){
        this.requestQ.push(request);
    };

    this.addRequestArray =function(requestArray){
        this.requestQ = requestArray;
    };

    //TODO read status
    this.execute = function (processNum) {
        if(cluster.isMaster) {
            let start = Date.now();
            console.log("Start Sending");
            let queue = [];
            let account = 0;
            let requestQ =this.requestQ;
            let node = this.node;

            //TODO add node list
            while(account < processNum){
                if(Object.keys(cluster.workers).length <= processNum){
                    let worker = cluster.fork();
                    worker.on('message', function(message) {
                        console.log('Process ' + this.process.pid + '  has retrieved a new response.');
                        queue.push(message);
                        if(requestQ.length>0){
                            worker.send([account,requestQ.pop(),node]);
                        }else {
                            this.destroy();
                        }
                    });
                    worker.send([account,requestQ.pop(),node]);
                    account++;
                }
                console.log(account);
            }
            cluster.on('exit', function(worker) {
                // When the master has no more workers alive it
                // prints the elapsed time and then kills itself
                if (Object.keys(cluster.workers).length === 0) {
                    console.log(JSON.stringify(queue));
                    console.log('Elapsed Time: ' + (Date.now() - start) + 'ms');
                    return queue;
                    // process.exit(1);
                }
            });
        } else{
            process.on('message', function(message) {
                console.log('Process ' + message[0] + '  is starting to work.');
                let node = message[2];
                let address = message[1]['targetAddress'];

                // TODO send/read
                setTimeout(function() {
                    console.log('Process ' + message[0] + '  is finished.');
                    console.log('message',message[1]['data'][0]);
                    message[1]['type'] = 'read';
                    message[1]['status'] = 200;
                    let req = [];
                    // let raw = JSON.parse(message[1]);
                    // TODO set address read from status no node ip here
                    if(message[1]['type'] === 'delete' ) {
                        for(let i in node){
                            if(node.hasOwnProperty(i) && node[i] !== address){
                                req.push(new Request('localhost').delete().setAddress(node).setPort(4455).addDataArray(message[1]['data']));
                            }
                        }
                    }else if(message[1]['type'] === 'update' ){
                        for(let i in node) {
                            if (node.hasOwnProperty(i) && node[i] !== address) {
                                req.push(new Request(message[1]['targetAddress']).replicate().setAddress(node).setPort(4455).addDataArray(message[1]['data']));
                            }
                        }
                    }
                    process.send([message[1]['status'],message[1],req]);
                }, 1000);

            });
        }
    }
}

module.exports = multiProcess;