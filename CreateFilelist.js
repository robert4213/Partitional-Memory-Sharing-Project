const sendRequest = require('./Request/sendRequest');

let username = process.argv[2];

sendRequest.post('filelist',username,JSON.stringify({}),function (response) {
    console.log('Add New List',response.text);
    console.log(response.message);
});