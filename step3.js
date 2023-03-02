const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

// output function
function output(text, out){
    if(out){
        console.log('outputting data to a file');
        fs.writeFile(out, text, 'utf8', (err)=>{
            if(err){
                console.log(`Couldn't write to ${out}: ${err}`);
                process.exit(1);
            } 
            console.log(`output success: data ${text}`);
        })
    }else {
        console.log(text);
    }
}

//  read file function
function cat (path, out){
    fs.readFile(path, 'utf8', (err, data)=>{
    
        if(err){
            console.log("It's an ERROR", err);
            process.exit(1);
        } else{
            output(data, out);
        }
        
    })
}

//  read web function
async function webCat(url, out){
    try{
        let res = await axios.get(url);
        let data = res.data
        output(data, out);
    }catch(e){
        console.error(`Error fetching ${url}: ${e}`);
        process.exit(1);
    }
}

let out;
let path;

if(argv[2].slice(0,2)==='--'){
    out = argv[3];
    path = argv[4];
} else{
    path = argv[2];
}

if(path.slice(0,4)==='http'){
    webCat(path, out);
} else{
    cat(path, out);
}