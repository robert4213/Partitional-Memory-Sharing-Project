const express = require('express');
const Mt = require('./MultiThread/mt');
const superagent = require('superagent');
const mapping = require('./Request/mapping');
const mt = new Mt();
const app = express();
const bodyParser = require('body-parser');
const formidable = require('formidable');
const path = require('path').posix;
const fs = require('fs');
const sendRequest = require('./Request/sendRequest');
const Request = require('./Request/request');
const Data = require('./Request/data');
const Status = require('./Status/status_handler');

const MAXSIZE = 4*1024*1024;

global.filelist = [];

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/download',(req,res,next)=>{
    let user = 'test1';
    console.log(req.query);
    for(let i in req.query){
        if(req.query.hasOwnProperty(i)) {
            mapping.getFile(req.query[i], user, num => {
                if (num === -1) {
                    res.status(400).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Error: 'No file found'});
                    return;
                } else if (num === 1) {
                    let fn = path.join(req.query[i],'1','0');
                    sendRequest.get(fn,user,function (response) {
                        //TODO write file
                        res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Success: 'Success'});
                    })
                }else{
                    // TODO exec multi
                }
            });
        }

    }
});

app.post('/upload',(req,res,next)=> {
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error', err);
            throw err
        }
        let user = fields['userid'];
        let filename,filepath='';
        let size;
        // console.log('Username', user)
        for (const file of Object.entries(files)) {
            filepath = file[1]['path'];
            filename = file[1]['name'];
            size = file[1]['size'];
        }
        let stdout = {'type':'update','path':filepath, 'filename':filename,'username':user,'size':size};
        console.log(stdout);
        if(size>MAXSIZE){
            // TODO exec
        }else{
            let fn = path.join(path.join(filename,'1'),'0');
            let chunk = fs.readFileSync(filepath, {encoding: 'binary'});
            sendRequest.post(fn,user,chunk,function (feedback) {
                console.log(feedback);
                res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Succeed:'Single File Upload'});
            });
            mapping.addFile(filename,user,1);
        }
    })
});

app.delete('/delete',(req,res,next) =>{
    let user = 'test1';
    console.log(req.query);
    for(let i in req.query){
        if(req.query.hasOwnProperty(i)) {
            mapping.getFile(req.query[i], user, num => {
                if (num === -1) {
                    res.status(400).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Error: 'No file found'});
                }else{
                    for(let i = 0; i < num; i++){
                        let fn = path.join(req.query[i],num.toString(), i.toString());
                        sendRequest.delete(fn,user);
                    }
                    mapping.deleteFile(req.query[i],user,function () {
                        res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Succeed:200});
                    });
                }
            });
        }

    }
});

app.get('/filelist',(req,res,next)=>{
    let file = {
        "file":["a.txt","b.txt","c.txt","d.txt"]
    };
    console.log(req);
    res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json(file);
    // res.status(200).json(Status(req.user,req.ip, PORT));
});

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status|| 500).set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json({
        error:{
            message: error.message
        }
    });
});

function checkStatus(response){
    let total = -1;
    let count = 0;
    for (let i in response) {
        if (response.hasOwnProperty(i)) {
            if (total === -1) {
                total = path.basename(path.basename(response[i]['data'][0]['filename']));
            }

            if (parseInt(response[i]) > 299 || parseInt(response[i]) < 200) {
                return false;
            }
            count++;
        }
    }
    return count === total;
}



// function addRecord(record){
//     const MongoClient = require('mongodb').MongoClient;
//     const uri = "mongodb+srv://test:test@cluster0-vprqz.mongodb.net/test?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
//     client.connect(err => {
//         client.db("test").collection("Record").insertOne(record);
//         client.close();
//     });
// }

module.exports = app;
