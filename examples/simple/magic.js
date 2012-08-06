var seaport = require("seaport")
    , net = require("net")

var ports = seaport.connect("localhost", 9090, {
    secret: "beep boop"
})

ports.service("magic@1.2.3", createMagic)

function createMagic(port, done) {
    var server = net.createServer(function (stream) {
        console.log("someone opened a connection to magic")
        stream.write("hello!")
        stream.on("data", function (data) {
            console.log("DATA FROM MAGIC STREAM", data.toString())
            stream.end()
        })
    })
    server.listen(port, done)
    console.log("magic service hooked on port", port)
}