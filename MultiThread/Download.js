const Mt = require('./mt');
const Request = require('../Request/request');
const Data = require('../Request/data');
const path = require('path').posix;
const config = require('../config/default');
const statusHandler = require('../Status/status_handler');
const fs = require('fs');

console.log(process.argv);
let filename = process.argv[2];
let username = process.argv[3];
let chunkNum = process.argv[4];

responseArray = [];
mt = new Mt();
for(let i = 0; i< chunkNum; i++){
    let data = new Data().setUser(username).setFIleName(filename,i.toString(),chunkNum.toString());
    console.log(data);
    let response = new Request('localhost').read().setAddress(config.address).addData(data);
    responseArray.push(response);
}

mt.addRequestArray(responseArray);
mt.execute(config.processNum, queue =>{
    let file = fs.createWriteStream(path.join(path.dirname(__dirname),'Info',filename),{encoding:config.encoding});
    file.on('error', function(err) { console.error(err); process.exit(); });
    for(let i in queue){
        if(queue[i][0] === 'error'){
            console.log(queue[i]);
            console.error('error');
            file.end();
            process.exit();
        }else if(queue[i][1]['success'] === 'false'){
            console.log(queue[i]);
            console.error('error');
            file.end();
            process.exit();
        }
        // console.log(JSON.stringify(queue[i][1]['content']));
        file.write(queue[i][1]['content']);
    }
    file.end();
});