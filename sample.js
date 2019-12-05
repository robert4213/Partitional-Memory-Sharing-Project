const Request = require('./Request/request');
const Data = require('./Request/data');
const Status = require('./Status/status')

//status read
status = new Status("10.0.0.1", 4455)
status.getStatusInBackground()


// Upload file
data1 = new Data().setUser("test1").loadFile(path.join(__dirname,'data.txt'),'root');
response = new Request(localIp).create().setAddress("10.0.0.1").setPort(4455).addData(data1).send();
console.log(__dirname);
// Data.saveFile(__dirname,"image38.jpg",data1.chunk);

// Read file
