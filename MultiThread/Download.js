const Mt = require('./mt');
const Request = require('../Request/request');
const Data = require('../Request/data');
const path = require('path').posix;
const config = require('../config/default');
const statusHandler = require('../Status/status_handler');

console.log(process.argv);
let filename = process.argv[2];
let username = process.argv[3];
let filepath = process.argv[4];

mt = new Mt();

data = new Data().setUser(username).loadFile(filepath,filename).chunks(config.MAXSIZE);
responseArray = [];
for(let chunk in data){
    if (data.hasOwnProperty(chunk)) {
        let response = new Request('localhost').update().setAddress(config.address).addData(data[chunk]);
        responseArray.push(response);
    }
}