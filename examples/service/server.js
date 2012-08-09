var ports = require("./seaport")
    , server = require("./http")
    , browserList = require("./browserList")

var boot = require("boot")
    , streamRouter = require("stream-router")()

streamRouter.addRoute("/seaport/*", ports)
streamRouter.addRoute("/browserList/*", browserList)

var sock = boot(streamRouter)
sock.install(server, '/boot')
console.log("sock hooked on", "/boot")