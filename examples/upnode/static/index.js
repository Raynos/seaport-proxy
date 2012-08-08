var boot = require("boot")
    , mdm = boot("/boot")
    , upnode = require("upnode")
    , seaport = require("../..")
    , ports = seaport(mdm)

var up = upnode.connect({
    createStream: createStream
})

setInterval(function () {
    up(function (remote) {
        remote.time(function (t) {
            console.log("time = " + t)
        })
    })
}, 1000)

function createStream() {
    return ports.get("magic@1.2.x")
}