const fs = require('fs');
const path = require('path');
const handlers = require('./hnd');
const KJS_library = require('./lib');
var katana = new KJS_library.K();



module.exports.Router = class Router {
    constructor(routes) {
        this.mConst =
        {
            ":[FNAME]": "\\w+\\.\\w+",
            ":[VAR]": "[\\w|_]+"
        };

        this.constPaths = Object.keys(this.mConst);
        this.constRe = Object.values(this.mConst);

        this.routingManifest = this.createManifest(routes);

        console.log(this.routingManifest);
    };//! ---- ---- ---- ---- ---- ---- ---- ----




    createManifest(routes) {
        var actualPath = Object.keys(routes);
        var psuedoPath = Object.values(routes);
        var manifest = [];

        for (let i = 0; i < psuedoPath.length; i++)
        {
            let type = '';
            let _static = true;
            let result = psuedoPath[i].split('/');

            for (let ii = 1; ii < result.length; ii++)
            {
                if (result[ii] == this.constPaths[0])
                {
                    result[ii] = this.constRe[0];
                    _static = false;
                    type = '[FNAME]';
                }
                else if (result[ii] == this.constPaths[1])
                {
                    result[ii] = this.constRe[1];
                    _static = false;
                    type = '[VAR]';
                };
            };

            let re = new RegExp(('^' + katana.reverseSplit(result) + '$'), 'i');

            manifest[i] = {
                "pathname": actualPath[i],
                "re": re,
                "dynamic": !_static,
                "type": type
            };
        };

        return manifest;
    };//! ---- ---- ---- ---- ---- ---- ---- ----




    routeRequest(KJS_ParsedReq, HttpRes) {
        var handle = new handlers.Handler();
        var reqpath = KJS_ParsedReq.pathname;
        var contenttype = KJS_ParsedReq.contenttype;
        var match = false;

        this.routingManifest.forEach((obj, i) => {
            if (obj.re.exec(reqpath) !== null)
            {
                katana.log_location('Manifest Routing Request', obj);//! [-T-E-S-T-]

                match = true;

                if (obj.dynamic === true) handle.dynamic(reqpath, contenttype, obj.pathname, HttpRes);
                if (obj.dynamic === false) handle.static(reqpath, contenttype, obj.pathname, HttpRes);
            };
        });

        if (!match)  handle.doesNotExist(HttpRes);
    };//! ---- ---- ---- ---- ---- ---- ---- ----





};// ================[ -End_Router_Class- ]================================================================    