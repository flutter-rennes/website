const watch = require('node-watch');
const httpServer = require('http-server');
const build = require('./build.js');

var host = "0.0.0.0";
var port = 8090;

var server = httpServer.createServer({ root: "docs"});
build();
server.listen(port, host, function () {

    var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host,
        protocol      = 'http://';

    console.log('Starting up http-server, serving ' + server.root + " on " + protocol + canonicalHost + ':' + port.toString());
    console.log('Watching changes on : src');
    console.log('Hit CTRL-C to stop the server');

    watch("src", { recursive: true }, build);
});