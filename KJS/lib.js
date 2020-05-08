const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const __appdir = path.dirname(__dirname);

module.exports.__appdir = __appdir;

module.exports.K = class K
{
    log_location(A, B, C)
    {
        console.log(`\n\n\n\n\t========( ${A} )========\n`);
        console.log(B);
        C !== undefined ? console.log(C) : console.log('');
        console.log(`........................................\n\n`);
    };


    parseRequest(HTTP_Request)
    {
        return {
            "pathname": url.parse(HTTP_Request.url).pathname,
            "method": HTTP_Request.method,
            "extname": path.extname(url.parse(HTTP_Request.url).pathname),
            "contenttype": HTTP_Request.headers.accept.split(',')[0]
        };
    };

    reverseSplit(StrArr)
    {
        var pathname = '';

        StrArr.forEach((path, i) => 
        {
            i < StrArr.length - 1 ? path += '/' : path += '';
            pathname += path;
        });

        return pathname;
    };
};