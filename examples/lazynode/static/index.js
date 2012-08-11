var boot = require("boot")
    , lazynode = require("lazynode")
    , seaport = require("../../../browser")
    , ports = seaport(boot("/boot"))

var remote = lazynode.connect({
    createStream: createStream
    , methods: ["time"]
})

setInterval(function () {
    remote.time(function (t) {
        console.log("time = " + t)
    })
}, 1000)

function createStream() {
    return ports.get("magic@1.2.x")
}