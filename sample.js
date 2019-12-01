var Request = require('./Request/request');

request = new Request().create().setAddress("10.0.0.1").setPort(4455).addData({name:"bababa"}).addData({name:"caca"}).send();