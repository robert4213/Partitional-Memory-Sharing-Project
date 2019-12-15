const superagent = require('superagent');
const path = require('path').posix;
const mapping = require('./mapping');
const sendRequest = {};
// const address = "172.20.10.12:5000";
const address ='localhost:9000';
const localAddress = path.join(__dirname,'download');

sendRequest.post = function (filename,username,chunk,callback) {
    let appname = path.join('dropbox',username);
    superagent
        .post(address+'/addFile')
        .send(
            {
                'fileId':path.join(appname,filename),
                'content':chunk
            }
        )
        .then(res => {
            console.log('Res',res.txt);
            callback(res);
        });
};

sendRequest.get = function (filename,username,callback) {
    let appname = path.join('dropbox',username);
    superagent
        .get(address+'/addFile')
        .query({
            'fileId':path.join(appname,filename),
        })
        .then(res => {
            console.log('Res',res.text);
            callback(res);
        });
};

sendRequest.delete = function (filename,username,callback) {
    let appname = path.join('dropbox',username);
    superagent
        .delete(address+'/deleteFile')
        .query({
            'fileId':path.join(appname,filename),
        })
        .then(res => {
            console.log('Res',res.text);
            // callback(res);
        });
};




module.exports = sendRequest;