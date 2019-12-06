# Partitional-Memory-Sharing-Project


## Client Request & Response
Both request and response is based from HTTP request and response
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
