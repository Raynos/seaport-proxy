var seaportServer = require("./seaport")
    , magicServer = require("./magic")
    , server = require("./http")

var boot = require("boot")
    , seaport = require("seaport")
    , Router = require("routes").Router
    , seaport = require("../..")

var sock = boot(streamHandler)
sock.install(server, '/boot')
console.log("sock hooked on", "/boot")

var ports = seaport.connect("localhost", 9093)

var streamRouter = new Router()
streamRouter.addRoute("/seaport/get/:service", ports.get)

function streamHandler(stream) {
    var route = streamRouter.match(stream.meta)
    if (route) {
        route.fn(stream, route.params)
    }
}