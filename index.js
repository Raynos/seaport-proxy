var partial = require("ap").partial
    , boot = require("boot")
    , net = require("net")
    , request = require("request")
    , PauseStream = require("pause-stream")
    , dnode = require("dnode")
    , extend = require("xtend")
    , getRegExp = /(seaport-proxy-get-)([\w\W]*)/

module.exports = seaportProxy

function seaportProxy(ports, httpServer, uri, callback) {
    var sock = boot(handleStream)

    sock.install(httpServer, uri)

    function handleStream(stream) {
        var meta = stream.meta

        stream.on("data", function (data) {
            console.log("incoming data", data)
        })

        if (typeof meta !== "string") {
            return callback && callback(stream)
        }
        var match = meta.match(getRegExp)
        if (match === null) {
            return callback && callback(stream)
        }
        var role = match[2]

        var bufferWriteStream = PauseStream()

        bufferWriteStream.pause()
        console.log("buffer the write stream")
        stream.pipe(bufferWriteStream)

        get(role, ports, bufferWriteStream, stream)
    }
}

function get(role, ports, write, read) {
    console.log("got ", role)
    ports.get(role, function (ports) {
        console.log("got ports", ports)
        var stream
        ports[0].protocol = ports[0].protocol || "net"
        if (ports[0].protocol === "net") {
            console.log("connecting", ports[0].port, ports[0].host)
            stream = net.connect(ports[0].port, ports[0].host)
        } else if (ports[0].protocol === "http") {
            console.log("http!")
            var uri = "http://" + ports[0].host + ":" + ports[0].port
            stream = request(uri)
        }

        write.pipe(stream).pipe(read)

        write.resume()
    })
}