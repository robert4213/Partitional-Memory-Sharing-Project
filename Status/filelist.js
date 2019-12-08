function createFileList(files) {
    let fileList = {};
    for(const file in files){
        const filename = path.basename(files[file]);
        let dir = path.dirname(files[file]);
        let folders = [];
        while (dir !== '/'){
            console.log(dir);
            folders.push(path.basename(dir));
            dir = path.dirname(dir);
        }
        let folder = fileList;
        while (folders.length != 0){
            const foldername = folders.pop();
            if(folder[foldername] == null){
                folder[foldername] = {};
            }
            folder = folder[foldername];
            console.log(folders);
        }
        folder[filename] = files[file].toString();
        console.log(files[file]);
    }

    return fileList;
}

module.exports = createFileList;