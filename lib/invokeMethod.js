var PauseStream = require("pause-stream")
    , pick = require("deck").pick
    , through = require("through")
    , net = require("net")

module.exports = invokeMethod

function invokeMethod(method, ports, stream, params) {
    var service = params.service
        , buffer = PauseStream()

    buffer.pause()

    stream.pipe(buffer)

    ports[method](service, connectToService)

    function connectToService(ports) {
        var port = pick(ports)
            , client = net.connect(port.port, port.host)

        buffer.resume().pipe(client)

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