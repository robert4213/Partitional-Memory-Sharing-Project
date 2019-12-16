const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');

const port = process.env.PORT || 4455;
const app = require('./app');
server = http.createServer(app);

server.listen(port);



