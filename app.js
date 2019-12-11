const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const Request = require('./Request/request');
const Data = require('./Request/data');
const Status = require('./Status/status_handler');

const PORT = 4455;

const result = function(status, list){

}

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/file',(req,res,next)=>{
    res.status(200).json({Succeed:200});
    console.log(req);
});

app.post('/file',(req,res,next)=>{
    res.status(200).json({Succeed:200});
    console.log(req);
});

app.get('/status',(req,res,next)=>{
    console.log(req);
    res.status(200).json({Succeed:200});
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



module.exports = app;
