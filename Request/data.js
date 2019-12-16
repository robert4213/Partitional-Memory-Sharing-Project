const app_name = 'dropbox';
const fs = require('fs');
const path = require('path').posix;
const multiparty = require('multiparty');




function Data() {
    const config = require('../config/default');
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
     * @param name
     * @returns {Data}
     */
    this.loadFile = function (localAddress,name){
        // let filepath = path.join(__dirname,address);
        this.filename = name;
        try {
            this.chunk = fs.readFileSync(localAddress, {encoding: config.encoding});
            // this.dataSize = fs.statSync(localAddress).size * 2; // HEX : BYTE  = 2:1
            this.dataSize = this.chunk.length;
        }catch (e) {
            console.log(e);
        }
        return this;
    };
    
    this.parseFile = function(req){
        let form = new multiparty.Form();
        form.parse(req, function(err,fields,file){
            console.log(fields);
        });
        return this;
    };
    
    /**
     * Set read file metadata
     * @param remoteAddress Remote file address
     */
    this.readFile = function (remoteAddress) {
        this.filename = remoteAddress;
        return this;
    };

    this.chunks = function(size){
        if(this.dataSize < size) {
            return [this];
        }

        let remainSize = this.dataSize;
        let i = 0;
        let total = Math.ceil(remainSize/size);
        let array = [];
        // console.log("data array starting",array);

        while(remainSize > size){
            let str = this.chunk.slice(0,size);
            const piece = new Data().setFIleName(this.filename,i.toString(),total.toString()).setChunk(str).setPureUser(this.appName).setSize(size);
            remainSize = remainSize - size;
            this.chunk = this.chunk.slice(size);
            array.push(piece);
            i++;
            // console.log('Data',JSON.stringify(piece));
        }
        const piece = new Data().setFIleName(this.filename,i.toString(),total.toString()).setChunk(this.chunk).setPureUser(this.appName).setSize(remainSize);
        array.push(piece);

        return array;
    };
    
    this.setChunk = function (chunk) {
        this.chunk = chunk;
        return this;
    };

    this.setPureUser = function (name) {
        this.appName = name;
        return this;
    };

    this.setSize = function (size) {
        this.dataSize = size;
        return this;
    };

    this.setFIleName = function (filename,id,total) {
        this.filename = path.join(path.join(filename,total),id);
        return this;
    }

}

module.exports = Data;

const config = require('../config/default');

module.exports.saveFile = function (localAddress, filename, chunk) {
    fs.writeFile( path.join(localAddress,filename),chunk,{encoding:config.encoding},function (err) {
        if(err){
            throw 'error writing file+' + err;
        }
    });
};

