const Request = require('./Request/request');
const Data = require('./Request/data');
const Status = require('./Status/status_old');
const path = require('path');
const Mt = require('./MultiThread/mt');

global.status = {};
//status read
// status = new Status("10.0.0.1", 4455);
// status.getStatusInBackground();

mt = new Mt();

// Upload file
data1 = new Data().setUser("test1").loadFile(path.join(__dirname,'app.js'),'root').chunks(200);
console.log("Filename",data1[0]["filename"]);
console.log(path.basename(data1[0]["filename"]));
// response1 = new Request('localhost').update().setAddress("10.0.0.1").setPort(4455).addDataArray(data1);
responseArray = [];
for(let chunk in data1){
    if (data1.hasOwnProperty(chunk)) {
        let response = new Request('localhost').update().setAddress("10.0.0.1").setPort(4455).addData(data1[chunk]);
        responseArray.push(response);
    }
}
console.log(JSON.stringify(responseArray));
// Data.saveFile(__dirname,"image38.jpg",data1.chunk);
mt.addRequestArray(responseArray);
response = mt.execute(4);


// // Read file
// data2 = new Data().setUser("test1").readFile("root//data.txt");
// response2 = new Request('localhost').read().setAddress("10.0.0.1").setPort(4455).addData(data2).send();
// console.log(response2);
// // for(file in response2.data){
// //     Data.saveFile(__dirname,path.basename(file.filename),file.chunk);
// // }