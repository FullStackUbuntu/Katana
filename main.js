const srv = require('./KJS/srv');
const rtr = require('./KJS/rtr');
const KJS_Libarary = require('./KJS/lib');
var katana = new KJS_Libarary.K();


var router = new rtr.Router(manifest = { 

    // OPENING PAGES/USER-INTERFACE
    "/Public/views/page/index.html"         :   "/",
    "/Public/views/page/index.html"         :   "/index",
    "/Public/views/page/about.html"         :   "/about",
    "/Public/views/page/contact.html"       :   "/contact",

    // HTTP STATUS CODES
    "/Public/views/errorMsg/err401.html"    :   "/status/err401.html",
    "/Public/views/errorMsg/err403.html"    :   "/status/err403.html",
    "/Public/views/errorMsg/err404.html"    :   "/status/err404.html",

    // STYLE-SHEETS
    "/Public/styles/byElement.css"          :   "/style/byElement.css",
    "/Public/styles/root.css"               :   "/style/root.css",

    // IMAGES
    "/favicon.ico"                          :   "/Public/images/ninjaEmoji.ico",

    // Entire Dir, uses a dynamic filename as last part of path
    "/Public/views/blog/"                   :   "/blog/:[FNAME]",
    "/Public/views/lib/"                    :   "/lib/:[FNAME]",
    "/Public/views/user/"                   :   "/user/:[FNAME]"
});




new srv.server(8888, (HTTP_request, HTTP_response) =>
{
    let parsedReq = katana.parseRequest(HTTP_request);
    
    katana.log_location('REQUEST RECIEVED', parsedReq);//! [-T-E-S-T-]

    router.routeRequest(parsedReq, HTTP_response);
});






