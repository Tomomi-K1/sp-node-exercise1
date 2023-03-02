const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function cat (path){
    fs.readFile(path, 'utf8', (err, data)=>{
        if(err){
            console.log("It's an ERROR", err);
            process.exit(1);
        }
        console.log(data);
    })
}

// function pathOnComandLine(){
   
//     webCat(argv[2]);
    
//     cat(argv[2]);   
    
// }

// pathOnComandLine();

async function webCat(url){
    try{
        let res = await axios.get(url);
        console.log(res.data)
    }catch(e){
        console.error(`Error fetching ${url}: ${e}`);
        process.exit(1);
    }

}

let path = argv[2];

if(path.slice(0,4)==='http'){
    webCat(path);
} else{
    cat(path);
}