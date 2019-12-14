const webreq = require('request');
const Data = require('./data');


function Request (localIp) {
    this.type = '';
    this.targetAddress = '';
    this.targetPort = '';
    this.targetId = '';
    this.sourceAddress = localIp;
    this.sourcePort = 99;
    this.data = [];

    this.create = function () {
        this.type = "create";
        return this;
    };

    this.read = function () {
        this.type = "read";
        return this;
    };

    this.update = function () {
        this.type = "update";
        return this;
    };

    this.delete = function () {
        this.type = "delete";
        return this;
    };

    this.replicate = function () {
        this.type = "replicate";
        return this;
    };

    this.setAddress = function (address) {
        this.targetAddress = address;
        return this;
    };

    this.setPort = function (port) {
        this.targetPort = port;
        return this;
    };

    this.setId = function (id) {
        this.targetId = id;
        return this;
    };

    this.addData = function (data) {
        if (!Array.isArray(this.data)) {
            this.data = [];
        }
        this.data.push(data);
        return this;
    };

    this.addDataArray = function (data) {
        if (!Array.isArray(this.data)) {
            this.data = [];
        }
        this.data = data;
        return this;
    };

    this.send = function () {
        console.log(JSON.stringify(this));
        // webreq('',{json:true}, (err, res, body) => {
        //     if (err) { return console.log(err); }
        //     console.log(body);
        //     // console.log(res);
        //     if(this.type === 'read' && body.data != null){
        //         for(const file in body.data){
        //             Data().saveFile(file.);
        //         }
        //     }
        // });

    };
}

module.exports = Request;