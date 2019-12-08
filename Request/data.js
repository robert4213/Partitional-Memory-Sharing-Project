var app_name = 'dropbox';
const fs = require('fs');
const path = require('path');


function Data() {
    // this.filename = '';
    this.chunk = '';
    this.filename = ''; // path/filename
    this.appName = app_name; // app_name/username
    this.dataSize = '';

    this.setUser  = function (username) {
        this.appName = path.join(app_name,username);
        return this;
    };

    /**
     * Read File
     * @param localAddress local file address w/ filename and extension
     * @param remoteAddress remote file address w/o filename and extension
     * @returns {Data}
     */
    this.loadFile = function (localAddress,remoteAddress){
        // let filepath = path.join(__dirname,address);
        this.filename = path.join(remoteAddress,path.basename(localAddress));
        try {
            this.chunk = fs.readFileSync(localAddress, {encoding: 'hex'});
            this.dataSize = fs.statSync(localAddress).size;
        }catch (e) {
            console.log(e);
        }
        return this;
    };

    /**
     * Set read file metadata
     * @param remoteAddress Remote file address
     */
    this.readFile = function (remoteAddress) {
        this.filename = remoteAddress;
        return this;
    }

}

module.exports = Data;

// TODO change to read Data
module.exports.saveFile = function (localAddress, filename, chunk) {
    fs.writeFile( path.join(localAddress,filename),chunk,{encoding:'hex'},function (err) {
        if(err){
            throw 'error writing file+' + err;
        }
    });
};

