path =require('path');
filenamelist = require('./filelist');
Data = require('../Request/data');
var fs = require('fs');


var list = ["/root/a/b/c/a.txt",'/root/b/c/cd/d.txt','/root/b/cc.txt','/root/b/d/d.txt','/root/trc.txt','/root/a/b/asd.md'];
var fileList = filenamelist(list);
console.log(filenamelist(list));
console.log(fileList['root']['a']['b']);

fs.writeFile(path.join(__dirname,'filelist.json'), JSON.stringify(fileList, null, 4), 'utf8',function (err) {
    if(err){
        throw 'error writing file+' + err;
    }
});
//
// console.log(path.basename('/root'));
// console.log(path.dirname('/root'));

// let a = {
//     "a": {
//         "name": "aa"
//     },
//     "b":{
//         name:"bb"
//     }
// };
// console.log(a["a"]["name"]);
// for( c in a){
//     console.log(a[c].name);
//     if(a[c].name === "bb"){
//         console.log(c);
//     }
// }
