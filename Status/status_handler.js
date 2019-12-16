const request = require('../Request/request');
const Data = require('../Request/data');
const fileList = require('./filelist');
const sendRequest = require('../Request/sendRequest');

let status = {};

/*
Format:
{
    'a.txt':6,
    'b.txt':8
}
 */

status.getList = function(username,callback){
    let list = '';
    sendRequest.get('filelist', username,function (response) {
        list = response.body['content'];
        if(list === null){
            console.log('New File List Created');
            callback({});
        }else {
            callback(JSON.parse(list));
        }
    })
};

status.addItem = function(username,item,num,callback){
    status.getList(username,function (list) {
        list[item] = num;
        sendRequest.post('filelist',username,JSON.stringify(list),function (response) {
            console.log('Add Item res',response.text);
            callback(response);
        });
    })
}

status.deleteItem = function(username,item,callback){
    status.getList(username,function (list) {
        delete list[item];
        sendRequest.post('filelist',username,JSON.stringify(list),function (response) {
            console.log('Add Item res',response.text);
            callback(response);
        });
    })
}

module.exports = status;

/**
 * Used to read new status file, and refresh the file list
 * @param user
 * @param targetAddress
 * @param targetPort
 * @param status
 * @param callback function to refresh the file list
 */
exports.statusRefresh = async function(user, targetAddress,targetPort) {
    return await new Request('localhost').update().setAddress(targetAddress).setPort(targetPort).addData(new Data().setUser(user)).send()
        .then(response =>{
            return response.filelist;
        })
        .catch(err =>{
            return err;
        });
};

