var cluster = require('cluster');
if(cluster.isMaster) {
    var start = Date.now();
    var data = [];
    for (i = 0; i < 20; i++) {
        data[i] = (i + 1) * 100;
    }
    var account = 0;
    var str = '';
    while(account < 5){
        if(Object.keys(cluster.workers).length <= 5){
            let worker = cluster.fork();
            worker.on('message', function(message) {

                console.log('Process ' + this.process.pid + '  has finished sorting its arrays.');
                str +=message.toString();
                if(data.length>0){
                    worker.send([account,data.pop()]);
                }else {
                    this.destroy();
                }
            });
            worker.send([account,data.pop()]);
            account++;
        }
        console.log(account);
    }
    cluster.on('exit', function(worker) {
        // When the master has no more workers alive it
        // prints the elapsed time and then kills itself
        if (Object.keys(cluster.workers).length === 0) {
            console.log(str);
            console.log('Elapsed Time: ' + (Date.now() - start) + 'ms');
            process.exit(1);
        }
    });
} else{
    process.on('message', function(message) {
        console.log('Process ' + message[0] + '  is starting to work.');
        setTimeout(function() {
            console.log('Process ' + message[0] + '  is finished.');
            process.send(message[1]);
        }, 2000);

    });
}
