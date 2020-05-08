const http = require('http');
const KJS_library = require('./lib');
let lib = new KJS_library.K();


module.exports.server = function server(INT_port, FN_callback)
{
    http.createServer(FN_callback).listen(INT_port);
    lib.log_location('Creating Server', `Port ${INT_port}`);
};