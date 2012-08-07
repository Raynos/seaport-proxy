var seaport = require("seaport")
    , net = require("net")

var ports = seaport.connect("localhost", 9093)

ports.service("magic@1.2.3", createMagic)

function createMagic(port, done) {
    var server = net.createServer(function (stream) {
        stream.write("hello from magic!")
        stream.on("data", console.log.bind(console, "[MAGIC]"))
    })
    server.listen(port, done)
    console.log("magic service hooked on port", port)
}