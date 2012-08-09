var boot = require("boot")
    , lazynode = require("lazynode")
    , seaport = require("../..")
    , ports = seaport(boot("/boot"))

var remote = lazynode.connect({
    createStream: createStream
    , methods: ["time"]
})

setInterval(timer, 1000)

function timer() {
    remote.time(log)
}

function log(time) {
    console.log("time = " + time)
}

function createStream() {
    return ports.get("magic@1.2.x")
}