var seaport = require("seaport")
    , upnode = require("upnode")
    , net = require("net")

var ports = seaport.connect("localhost", 9093)

ports.service("magic@1.2.3", createMagic)

function createMagic(port, done) {
    var server = net.createServer(function (stream) {
        var up = upnode(function (client, conn) {
            this.time = function (cb) {
                cb(new Date().toString())
            }
        })
        up.pipe(stream).pipe(up)
    })
    server.listen(port, done)
    console.log("magic service hooked on port", port)
}