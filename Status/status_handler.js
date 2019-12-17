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
        console.log(response);
        // list = response.body['content'];
        if (!response.body['content']){
            console.log('New File List Created');
            sendRequest.post('filelist',username,JSON.stringify({}),function (response) {
                console.log('Add New List',response.text);
            });
            callback({});
        }else if(response.body['content'] === null){
            console.log('New File List Created');
            sendRequest.post('filelist',username,JSON.stringify({}),function (response) {
                console.log('Add New List',response.text);
            });
            callback({});
        }else {
            callback(JSON.parse(response.body['content']));
        }
    })
};

status.getItem = function(filename,username,callback){
    sendRequest.get('filelist', username,function (response) {
        console.log('read file item',response.text);
        // if(typeof response.body === undefined){
        //     callback(-2);
        // }else
            if(!response.body['content']){
            console.log('New File List Created');
            sendRequest.post('filelist',username,JSON.stringify({}),function (response) {
                console.log('Add New List',response.text);
                callback(-1);
            });
        }else if(typeof JSON.parse( response.body['content'])[filename] === "undefined"){
            console.log('Item List No file Found');
            callback(-1);
        }else{
            console.log('File Found',JSON.parse( response.body['content'])[filename], 'chunks');
            callback(JSON.parse(response.body['content'])[filename]);
        }
    })
};


status.addItem = function(item,username,num,callback){
    status.getList(username,function (list) {
        list[item] = num;
        sendRequest.post('filelist',username,JSON.stringify(list),function (response) {
            console.log('Add Item res',response.text);
            callback(response);
        });
    })
};

status.deleteItem = function(item,username,callback){
    status.getList(username,function (list) {
        delete list[item];
        sendRequest.post('filelist',username,JSON.stringify(list),function (response) {
            console.log('Add Item res',response.text);
            callback(response);
        });
    })
};

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

