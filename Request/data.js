var app_name = 'dropbox';

function Data() {
    // this.filename = '';
    this.chunk = '';
    this.hashId = ''; //app_name+filename
    this.dataSize = '';

    //TODO Read Data from disk - leave for Xiaoting
    this.readFile = function (address){
        return this;
    };

    //TODO Save file to disk - leave for Xiaoting
    this.saveFile = function (address , chunk) {

    };

}

module.exports = Data;