var ports = require("./seaport")
    , server = require("./http")
    , browserList = require("./browserList")

var boot = require("boot")
    , StreamRouter = require("stream-router")

var streamRouter = StreamRouter()
    , sock = boot(log(streamRouter))

streamRouter.addRoute("/seaport/*", ports)
streamRouter.addRoute("/browserList/*", browserList)

sock.install(server, '/boot')
console.log("sock hooked on", "/boot")

function log(f) {
    return function (stream) {
        console.log("[INCOMING-STREAM]", {
            meta: stream.meta
            , id: stream.id
        })
        /*stream.on("data", function (data) {
            console.log("[STREAM-DATA]", {
                meta: stream.meta
                , id: stream.id
                , data: data
            })
        })*/
        f.apply(this, arguments)
    }
}