var net = require("net")
    , rack = require("hat").rack(128, 16, 16)
    , through = require("through")
    , PauseStream = require("pause-stream")
    , MuxDemux = require("mux-demux")

module.exports = service

function service(ports, stream, params) {
    var serviceName = params.service
        , server = net.createServer(onConnection)
        , mdm = MuxDemux({
            error: false
        })

    stream.pipe(mdm).pipe(stream)

    ports.service(serviceName, createServer)

    function createServer(port, ready) {
        server.listen(port, ready)
    }

    function onConnection(connection) {
        var stream = mdm.createStream(rack())
            , intermediate = through(stringer)
            , buffer = PauseStream().pause()

        stream.pipe(buffer)

        process.nextTick(pipe)

        function pipe() {
            connection.pipe(intermediate).pipe(stream)
            buffer.resume().pipe(connection)
        }
    }
}

function stringer(data) {
    this.emit("data", data.toString())
}