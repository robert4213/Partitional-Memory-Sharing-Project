const MongoClient = require('mongodb').MongoClient;

const mapping = {};
const uri = "mongodb+srv://test:test@cluster0-vprqz.mongodb.net/test?retryWrites=true&w=majority";

mapping.getlist = async function (){
    const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
    let filelist = [];
    await client.connect( err => {
        let cursor =client.db("test").collection("filelist").find();

         cursor.each(function(err, doc) {
            Object.prototype.toString.call(doc);
            if(doc !== null && doc.hasOwnProperty('filename') && doc.hasOwnProperty('num') ){
                filelist[doc['filename']]= doc['num'];
            }
        });
        client.close();
    });
    return filelist;
};

mapping.addFile = async function (filename,username,chunkNum) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect( async err => {
        let collection =client.db("test").collection("filelist");
        await collection.find({filename:filename,user:username}).toArray(function(err, results){
            // console.log({filename:filename,user:username});
            // console.log('db result',results); // output all records
            if(results.length === 0){
                collection.insertOne({filename:filename,user:username,num:chunkNum}, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    client.close();
                });
            }else if(results[0]['num'] !== chunkNum){
                //TODO delete file
                let myquery = {filename:filename,user:username};
                collection.deleteOne(myquery, function(err, obj) {
                    if (err) throw err;
                    console.log("1 document deleted");
                });
                collection.insertOne({filename:filename,user:username,num:chunkNum}, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    client.close();
                });
            }
        });
        // client.close();
    });
};

mapping.deleteFile =  function (filename,username,callback) {
    const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
    client.connect( err => {
        let collection =client.db("test").collection("filelist");
        let myquery = {filename:filename,user:username};
        collection.deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
        });
        client.close();
    });
    callback();
};

mapping.getFile = function (filename,username,callback) {
    const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
    client.connect( err => {
        let collection = client.db("test").collection("filelist");
        collection.find({filename: filename, user: username}).toArray(function (err, results) {
            console.log(results);
            if(typeof results[0] === 'undefined' || typeof results[0]['num'] === 'undefined'){
                callback(-1);
            }else {
                callback(results[0]['num'])
            }
        });
    });
    client.close();
};

module.exports = mapping;