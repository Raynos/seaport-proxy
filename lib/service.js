var StreamServerProxy = require("browser-stream-server")
    , net = require("net")
    , PauseStream = require("pause-stream")
    , through = require("through")

module.exports = service

function service(ports, prefix) {
    var proxy = StreamServerProxy(prefix)
        , servers = {}

    console.log("proxy created")

    proxy.on("server-created", createServer)
    proxy.on("server-destroyed", cleanupServer)

    return proxy

    // create seaport service when server stream comes up
    function createServer(serverName) {
        console.log("creating server", serverName)
        var server = servers[serverName] = net.createServer(handleConnection)
        ports.service(serverName, listen)

        function handleConnection(connection) {
            console.log("got incoming connection", connection)
            var stream = proxy.connect(serverName)
                , buffer = PauseStream().pause()
                , intermediate = through(stringer)

            connection.pipe(buffer)

            process.nextTick(pipe)

            function pipe() {
                buffer.pipe(intermediate)
                    .pipe(stream).pipe(connection)

                buffer.resume()
            }
        }

        function listen(port, ready) {
            server.listen(port, ready)
        }
    }

    // close servers when server stream goes down
    function cleanupServer(serverName) {
        var server = servers[serverName]
        server && server.close()
    }
}

function stringer(data) {
    this.emit("data", data.toString())
}
/*var net = require("net")
    , rack = require("hat").rack(128, 16, 16)
    , through = require("through")
    , PauseStream = require("pause-stream")
    , url = require("url")
    , connections = {}

module.exports = service

function service(ports, stream, params) {
    var serviceName = params.service
        , streamId = url.parse(stream.meta, true).query.streamId

    console.log("got streamId", streamId)

    if (streamId) {
        var connection = connections[streamId]
            , intermediate = through(stringer)

        if (connection === undefined) {
            return stream.end()
        }

        stream.pipe(connection)

        process.nextTick(pipe)

    } else {
        console.log("started server")
        var server = net.createServer(onConnection)
        ports.service(serviceName, createServer)
    }

    function createServer(port, ready) {
        server.listen(port, ready)
    }

    function onConnection(connection) {
        console.log("got connection")
        var streamId = rack()
        connections[streamId] = connection

        connection.on("end", deleteConnection)

        stream.write(streamId)

        function deleteConnection() {
            delete connections[streamId]
        }
    }

    function pipe() {
        connection.pipe(intermediate).pipe(stream)
    }
}

function stringer(data) {
    this.emit("data", data.toString())
}*/