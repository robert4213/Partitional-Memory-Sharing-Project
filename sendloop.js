const sendRequest = require('./Request/sendRequest');

let username = process.argv[2];
let i = 0;
setInterval(function () {
    console.log('New Message send')
    sendRequest.post('test'+ i.toString(), username, JSON.stringify('dropbox-test'), function (response) {
        console.log('Add new test', response.text);
        console.log(response.status);
        console.log(response.message);
    });
},1000);

