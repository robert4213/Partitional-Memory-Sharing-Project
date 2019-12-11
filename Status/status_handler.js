const request = require('../Request/request');
const Data = require('../Request/data');
const fileList = require('./filelist');
require('./status');

function StatusHandler(){
    this.status = {};
    this.refresh = function(user, targetAddress,targetPort,callback){
        let data = new Data().setUser(user);
        let response = new Request('localhost').update().setAddress(targetAddress).setPort(targetPort).addData(data).send();
    };

}


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

