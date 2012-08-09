var rack = require("hat").rack(128, 16, 16)
    , MuxDemux = require("mux-demux")

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
        var mdm = MuxDemux({
                error: false
            })
            , connection = server.createStream(prefix + "/service/" +
                serviceName + "/?uuid=" + rack())

        connection.pipe(mdm).pipe(connection)

        mdm.on("connection", callback)
    }
}