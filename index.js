var partial = require("ap").partial
    , StreamRouter = require("stream-router")
    , seaport = require("seaport")
    , invokeMethod = require("./lib/invokeMethod")
    , service = require("./lib/service")

module.exports = {
    connect: SeaportProxy
}

function SeaportProxy(ports, port, opts, prefix) {
    if (typeof ports === "string") {
        ports = seaport.connect(ports, port, opts)
    }

    if (typeof port === "string") {
        prefix = port
    }

    if (typeof opts === "string") {
        prefix = opts
    }

    prefix = prefix || "/seaport"

    var streamRouter = StreamRouter()
        , serviceRoute = prefix + "/service/*"
        
    streamRouter.addRoute(prefix + "/get/:service/*"
        , partial(invokeMethod, "get", ports))
    streamRouter.addRoute(prefix + "/query/:service/*"
        , partial(invokeMethod, "query", ports))
    streamRouter.addRoute(prefix + "/service/*"
        , service(ports, prefix + "/service"))

    return streamRouter
}