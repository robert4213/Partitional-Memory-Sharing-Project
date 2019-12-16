# Partitional-Memory-Sharing-Project

## Command In Root
All Download Files may store in root/Info
```
npm install 
npm start
cd frontend
npm install
npm start
```


## Client Request & Response
Both request and response are based on HTTP request and response, but are applied in JSON format.


Currently we will use restful API to transfer request/response through client and nodes. 
### Request
```
{
    type:"update/read/replicate",
    targetIp:"10.0.0.1",
    targetPort:10,
    sourceIp:"10.0.0.2",
    sourcePort:20,
    Data:[
        {
            filename:"a.txt",
            appname:"dropbox",
            chunk:"1634312", //Hex code
            chunkSize:50 //unit(Bytes)
        },
        {
            filename:"b.txt",
            appname:"dropbox",
            chunk:"163543312",
            chunkSize:78 
        }
    ]
}
```
### Response
```
{
    type:"update/read/replicate",
    targetIp:"10.0.0.2",
    targetPort:20,
    sourceIp:"10.0.0.1",
    sourcePort:10,
    Data:[
        {
            filename:"a.txt",
            appname:"dropbox",
            chunk:"1634312",
            chunkSize:"50" //unit(Bytes)
        },
        {
            filename:"b.txt",
            appname:"dropbox",
            chunk:"163543312",
            chunkSize:"78" 
        }
    ],
    status: 200
}
```

## File List Format
```
{
    "file": [
        "a.txt",
        "b.txt",
        "c.txt",
        "d.txt"
    ]
}
```
