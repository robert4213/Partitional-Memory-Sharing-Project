const Request = require('./Request/request');
const Data = require('./Request/data');

data1 = new Data().readFile('Address');
request = new Request().create().setAddress("10.0.0.1").setPort(4455).addData(data1).send();