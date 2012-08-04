var seaport = require("seaport")
    , ports = seaport.connect(9092, { secret: 'beep boop' })
    , net = require("net")

var server = net.createServer(function (stream) {
    console.log("got request!")

    stream.write("magic from seaport")
})

console.log("calling service on seaport")

ports.service('magic@1.2.3', function (port, ready) {
    console.log("registered magic service", port)
    server.listen(port, ready)
})