const express = require('express');
const { exec } = require('child_process');
const mapping = require('./Request/mapping');
const statusHandler = require('./Status/status_handler');
const app = express();
const bodyParser = require('body-parser');
const formidable = require('formidable');
const path = require('path').posix;
const fs = require('fs');
const sendRequest = require('./Request/sendRequest');
const Data = require('./Request/data');
const cors = require('cors');
const config=require('./config/default');
const MAXSIZE = config.MAXSIZE;
const encoding = config.encoding;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/download',(req,res,next)=>{
    let user = '';
    console.log('download',req.query);
    user = req.query['userid'];
    for(let i in req.query['file']){
        if(req.query['file'].hasOwnProperty(i)) {
            console.log('checking: ',req.query['file'][i], user);
            statusHandler.getItem(req.query['file'][i], user, num => {
                console.log('Check file chunk number');
                if (num === -1) {
                    console.log('Client Request No file found');
                    res.status(400).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Error: 'No file found'});
                } else if (num === 1) {
                    let fn = path.join(req.query['file'][i],'1','0');
                    sendRequest.get(fn,user,function (response) {
                        Data.saveFile('./Info',req.query['file'][i],response.body['content']);
                        res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Success: 'Success'});
                    })
                }else{
                    // TODO exec multi
                    exec('node sample', (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error: ${error}`);
                            return;
                        }
                        console.log(`stdout: ${stdout}`);
                        console.error(`stderr: ${stderr}`);
                    });

                    res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Success: 'Go Multi Download'});
                }
            });
        }

    }
});

app.post('/upload',(req,res,next)=> {
    console.error('UpLoad Request');
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
        console.log(MAXSIZE);
        if(size>MAXSIZE){
            console.log('Multiprocess On');
            exec('node ./MultiThread/Upload '+filename+' '+ user + ' '+ filepath, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Succeed:'Multiple File Upload'});
            });
        }else{
            let fn = path.join(path.join(filename,'1'),'0');
            let chunk = fs.readFileSync(filepath, {encoding: config.encoding});
            sendRequest.post(fn,user,chunk,function (feedback) {
                console.log(feedback.body);
                res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Succeed:'Single File Upload'});
            });
            // mapping.addFile(filename,user,1);
            statusHandler.getItem(filename, user, num => {
                console.log('Upload Check file chunk number');
                if (num !== 1) {
                    console.log('New File List Update');
                    statusHandler.addItem(filename, user,1,function (response) {
                        console.log('update list',response.body);
                    });
                }
            });
        }
    })
});

app.delete('/delete',(req,res,next) =>{
    let user = 'test1';
    console.log(req.query)
    res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json({Succeed:"Not support"});
    return
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

app.get('/status',(req,res,next)=>{
    // let file = {
    //     "file":["a.txt","b.txt","c.txt","d.txt"]
    // };
    console.log("Get File list",req.query);
    statusHandler.getList(req.query['userid'],function (list) {
        let file = {};
        file['file'] = [];
        for(let i in list){
            file['file'].push(i);
        }
        file['file'] = list;
        res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json(file);
    });
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
