const superagent = require('superagent');
const path = require('path').posix;
const sendRequest = {};
const config=require('../config/default');

sendRequest.address =config.address;
sendRequest.appname =config.appname;

sendRequest.post = function (filename,username,chunk,callback) {
    let appname = path.join(sendRequest.appname,username);
    superagent
        .post(sendRequest.address+'/addFile')
        .send(
            {
                'fileId':path.join(appname,filename),
                'content':chunk,
                'size' : chunk.length
            }
        )
        .then(res => {
            console.log('Res',res.text);
            callback(res);
        });
};

sendRequest.get = function (filename,username,callback) {
    let appname = path.join(sendRequest.appname,username);
    console.log('read file request');
    superagent
        .get(sendRequest.address+'/getFile')
        .query({
            'fileId':path.join(appname,filename)
        })
        .then(res => {
            console.log('Res',res.status);
            callback(res);
        }, err => {
            console.log('Error Message',err.message);
            callback(err);
        });
};

sendRequest.delete = function (filename,username,callback) {
    let appname = path.join(sendRequest.appname,username);
    superagent
        .delete(sendRequest.address+'/deleteFile')
        .query({
            'fileId':path.join(appname,filename),
        })
        .then(res => {
            console.log('Res',res.text);
            // callback(res);
        });
};

module.exports = sendRequest;