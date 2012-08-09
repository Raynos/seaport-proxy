var net = require("net")
    , rack = require("hat").rack(128, 16, 16)

module.exports = service

function service(ports, mdm, params) {
    var serviceName = params.service
        , server = net.createServer(onConnection)

    ports.service(serviceName, createServer)

    function createServer(port, ready) {
        server.listen(port, ready)
    }

    function onConnection(connection) {
        var stream = mdm.createStream(rack())
        connection.pipe(stream).pipe(connection)
    }
}