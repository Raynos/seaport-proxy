var StreamServer = require("browser-stream-server")
    , rack = require("hat").rack(128, 16, 16)

module.exports = seaport

function seaport(server, prefix) {
    prefix = prefix || "/seaport"

    return {
        get: get
        , query: query
        , service: service
    }

    function get(service) {
        return server.createStream(prefix + "/get/" + service +
            "/?uuid=" + rack())
    }

    function query(service) {
        return server.createStream(prefix + "/query/" + service +
            "/?uuid=" + rack())
    }

    function service(serviceName, callback) {
        console.log("created StreamServer", serviceName)
        var streamServer = StreamServer(server, {
            prefix: prefix + "/service"
        }, callback)
        var stream = streamServer.listen(serviceName)
        console.log("server", stream.meta)
        return stream
    }
}