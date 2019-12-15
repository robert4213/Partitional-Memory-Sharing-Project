const app_name = 'dropbox';
const fs = require('fs');
const path = require('path').posix;
const multiparty = require('multiparty');



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
        console.log("data array starting",array);

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

module.exports.saveFile = function (localAddress, filename, chunk) {
    fs.writeFile( path.join(localAddress,filename),chunk,{encoding:'hex'},function (err) {
        if(err){
            throw 'error writing file+' + err;
        }
    });
};

