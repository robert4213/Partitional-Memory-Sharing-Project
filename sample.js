const Request = require('./Request/request');
const Data = require('./Request/data');
const Status = require('./Status/status')

status = new Status("10.0.0.1", 4455)
status.getStatusInBackground()

data1 = new Data().readFile('Address');
request = new Request().create().setAddress("10.0.0.1").setPort(4455).addData(data1).send();