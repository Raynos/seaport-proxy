var seaport = require("seaport")
    , ports = seaport.connect(9090, { secret: 'beep boop' })
    , net = require("net")
    , dnode = require("dnode")

var server = net.createServer(function (stream) {
    console.log("got incoming request!")
    var d = dnode({
        magic: function (cb) {
            console.log("someone called magic!")
            cb(null, "magic!")
        }
    })
    d.pipe(stream).pipe(d)
})

ports.service('magic@1.2.3', function (port, ready) {
    console.log("registered magic service")
    server.listen(port, ready)
})