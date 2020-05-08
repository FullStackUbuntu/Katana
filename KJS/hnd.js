const fs = require('fs');
const path = require('path');
const __appdir = path.dirname(__dirname);
const KJS_Libarary = require('./lib');
var katana = new KJS_Libarary.K();



module.exports.Handler = class Handler {
    constructor() {
    }

    static(reqpath, contenttype, manifestpath, response){
        console.log('REQUESTED_PATH:\t' + reqpath);
        console.log('MANIFEST_PATH:\t' + manifestpath);

        var filepath = path.join(__appdir, manifestpath);
        console.log('FILE_PATH:\t' + filepath);

        this.read_N_serve(filepath, contenttype, response);
    };


    dynamic(reqpath, contenttype, manifestpath, response) {
        let result = reqpath.split('/');
        let filename = result[result.length - 1];
        let filepath = path.join(__appdir, manifestpath, filename);        
        
        this.read_N_serve(filepath, contenttype, response);
    }




    read_N_serve(filepath, contenttype, response)
    {
        console.log(`Reading file ${filepath} to serve it!`);
     
        fs.readFile(filepath, (err, data) =>
        {
            if (err) console.log(err, `\nERROR: Function -> read_N_serve() ${filepath}`);
            response.writeHead(200, contenttype);
            response.write(data);
            response.end();
        });
    };
    
};