var partial = require("ap").partial
    , pick = require("deck").pick
    , net = require("net")
    , PauseStream = require("pause-stream")
    , through = require("through")
    , seaport = require("seaport")

module.exports = {
    connect: SeaportProxy
}

function SeaportProxy(ports, port, opts) {
    if (typeof ports === "string") {
        ports = seaport.connect(ports, port, opts)
    }
    return {
        get: partial(get, ports)
    }
}

function get(ports, stream, params) {
    var service = params.service
        , buffer = PauseStream()

    buffer.pause()

    stream.pipe(buffer)

    ports.get(service, connectToService)

    function connectToService(ports) {
        var port = pick(ports)
            , client = net.connect(port.port, port.host)

        buffer.pipe(client)
        buffer.resume()

        var intermediate = through(stringer)
        process.nextTick(pipe)

        function pipe() {
            client.pipe(intermediate).pipe(stream)
        }
    }
}

function stringer(data) {
    this.emit("data", data.toString())
}