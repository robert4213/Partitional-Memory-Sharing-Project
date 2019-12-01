var app_name = 'dropbox';

function Data() {
    // this.filename = '';
    this.chunk = '';
    this.hashId = '';
    this.dataSize = '';

    //Read Data from disk
    this.readFile = function (address){
        return this;
    };

    //Save file to disk
    this.saveFile = function (address , chunk) {

    };

}

module.exports = Data;