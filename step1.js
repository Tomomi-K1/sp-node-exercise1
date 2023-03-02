const fs = require('fs');
const path = require('path');
const argv = process.argv;

function cat (path){
    fs.readFile(path, 'utf8', (err, data)=>{
        if(err){
            console.log("It's an ERROR", err);
            process.kill(1);
        }
        console.log(data);
    })
}

function pathOnComandLine(){
    cat(argv[2]);
}

pathOnComandLine();

