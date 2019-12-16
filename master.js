const { exec } = require('child_process');
exec('node app', (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error}`);
        return;
    }
    console.log('stdout: ', stdout);
    console.error(`stderr: ${stderr}`);
});

const Request = require('./Request/request');
const Data = require('./Request/data');
const path = require('path').posix;
const Mt = require('./MultiThread/mt');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0-vprqz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
var collection;

client.connect(err => {
    collection = client.db("test").collection("Record");
    while (true){
       collection.findOne({},function (err,doc) {
            let user = doc;
       });

    }
});
