const Request = require('./Request/request');
const Data = require('./Request/data');
const Status = require('./Status/status_old')

global.status = {};
//status read
status = new Status("10.0.0.1", 4455)
status.getStatusInBackground()


// Upload file
data1 = new Data().setUser("test1").loadFile(path.join(__dirname,'data.txt'),'root');
response1 = new Request('localhost').update().setAddress("10.0.0.1").setPort(4455).addData(data1).send();
console.log(response);
// Data.saveFile(__dirname,"image38.jpg",data1.chunk);

// Read file
data2 = new Data().setUser("test1").readFile("root//data.txt");
response2 = new Request('localhost').read().setAddress("10.0.0.1").setPort(4455).addData(data2).send();
console.log(response2);
for(file in response2.data){
    Data.saveFile(__dirname,path.basename(file.filename),file.chunk);
}