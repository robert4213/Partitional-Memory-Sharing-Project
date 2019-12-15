const express = require('express');
const Mt = require('./MultiThread/mt');

const mt = new Mt();

const app = express();
const bodyParser = require('body-parser');

const Request = require('./Request/request');
const Data = require('./Request/data');
const Status = require('./Status/status_handler');

const PORT = 4455;


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/download',(req,res,next)=>{
    console.log(req.body);
    res.status(200).json({Succeed:200});
    return;
    //TODO create request

    mt.addRequestArray(responseArray);
    mt.execute(4).then(response =>function () {
        let data = [];
        let total = null;
        if(checkStatus(response[0])) {
            for(let i in response[1]){
                if (response[1].hasOwnProperty(i)){
                    if(total === null){
                        total = path.basename(path.basename(response[1][i]['data'][0]['filename']));
                        // total=(function(a,b){while(a--)b[a]=a;return b})(num,[]);
                    }
                    let id = parseInt(path.basename(response[1][i]['data'][0]['filename']));
                    data[id] = response[1][i]['data'][0]['chunk'];
                }
            }
            if(data.length === total){
                let str = '';
                for(let i in data){
                    if (data.hasOwnProperty(i)) {
                        str.concat(data[i]);
                    }
                }
                //TODO save file

                res.status(200).json({Succeed:200});
            }
        }else{
            res.status(500).json({Error:'Save Error'});
        }

    });
});

app.post('/upload',(req,res,next)=> {
    console.log(req);
    res.status(200).json({Succeed:200});
    return;

    mt.addRequestArray(responseArray);
    mt.execute(4).then(response => function () {
        if(checkStatus(response[0])){
            let reqArray = [];
            for (let i in response[2]) {
                if (response[2].hasOwnProperty(i)) {
                    for (let j in response[2][i]) {
                        if (response[2][i].hasOwnProperty(j)) {
                            reqArray.push(response[2][i][j]);
                        }
                    }
                }
            }
            mt.addRequestArray(reqArray);
            mt.execute(4);
            res.status(200).json({Succeed:200});
        }else{
            res.status(400).json({Error:'Miss file'});
        }
    });
});

app.delete('/file',(req,res,next) =>{
    console.log(req);
    res.status(200).json({Succeed:200});
    return;

    mt.addRequestArray(responseArray);
    mt.execute(4).then(response => function () {
        if(checkStatus(response[0])){
            let reqArray = [];
            for (let i in response[2]) {
                if (response[2].hasOwnProperty(i)) {
                    for (let j in response[2][i]) {
                        if (response[2][i].hasOwnProperty(j)) {
                            reqArray.push(response[2][i][j]);
                        }
                    }
                }
            }
            mt.addRequestArray(reqArray);
            mt.execute(4);
            res.status(200).json({Succeed:200});
        }else{
            res.status(400).json({Error:'Delete Error'});
        }
    });
});

app.get('/filelist',(req,res,next)=>{
    let file = {
        "file":["a.txt","b.txt","c.txt","d.txt"]
    };
    console.log(req);
    res.status(200).json(file);
    // res.status(200).json(Status(req.user,req.ip, PORT));
});

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status|| 500);
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

module.exports = app;
