var seaport = require("seaport-stream")
    , net = require("net")

var ports = seaport.connect("localhost", 9093)

ports.service("magic@1.2.3", createMagic)

function createMagic(stream) {
    stream.write("hello from magic!")
    stream.on("data", function (data) {
        console.log("[MAGIC]", data.toString())
    })
}