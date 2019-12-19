const Mt = require('./mt');
const Request = require('../Request/request');
const Data = require('../Request/data');
const path = require('path').posix;
const config = require('../config/default');
const statusHandler = require('../Status/status_handler');

console.log(process.argv.length);
let filename = process.argv[2];
let username = process.argv[3];
let filepath = process.argv[4];

console.log(filename, username);
console.log(filepath);

mt = new Mt();

data = new Data().setUser(username).loadFile(filepath,filename).chunks(config.MAXSIZE);
var responseArray = [];
for(let chunk in data){
    if (data.hasOwnProperty(chunk)) {
        // console.log(JSON.stringify(data[chunk]));
        let response = new Request('localhost').update().setAddress(config.address).addData(data[chunk]);
        responseArray.push(response);
    }
}

var addFile = false;

mt.addRequestArray(responseArray);
mt.execute(config.processNum, queue =>{
    let flag = false;
    for(let i in queue){
        if(queue[i][0] === 'error'){
            console.log(JSON.stringify(queue[i]));
            flag = true;
        }else if(queue[i][1]['success'] === 'false'){
            console.log(JSON.stringify(queue[i]));
            flag = true;
        }
    }

    // console.log("FileList Update")
    //
    // if(!flag ) {
    //     addFile = true;
    //     statusHandler.getItem(filename, username, num => {
    //         console.log('Upload Check file chunk number');
    //         if (num !== data.length) {
    //             console.log('File List Update, Chunk Num: ', data.length);
    //             statusHandler.addItem(filename, username, data.length, function (response) {
    //                 console.log('update list', response.body);
    //             });
    //         }
    //     });
    // }
});

