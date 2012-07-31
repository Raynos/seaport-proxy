var partial = require("ap").partial
    , shoe = require("shoe")
    , net = require("net")
    , request = require("request")
    , upnode = require("upnode")
    , extend = require("xtend")
    , MuxDemux = require("mux-demux")

module.exports = seaportProxy

function seaportProxy(ports, httpServer, uri) {
    var sock = shoe(handleStream)

    sock.install(httpServer, uri)

    function handleStream(stream) {
        var up = upnode(attachProxy)
            , mdm = MuxDemux()
            , streams = {}

        mdm.on("connection", handleIncomingStreams)
            
        stream.pipe(mdm).pipe(stream)

        function handleIncomingStreams(stream) {
            if (stream.meta === "upnode") {
                console.log("got upnode stream")
                up.pipe(stream).pipe(up)
            } else {
                console.log("got a keyed stream", stream.meta)
                streams[stream.meta] = stream
            }
        }

        function attachProxy(ports) {
            this.get = get
            this.query = query
        }

        function get(role, token) {
            console.log("got get request", role, token)
            ports.get(role, partial(connectToPort, token))
        }

        function query(role, token) {
            ports.query(role, partial(connectToPort, token))
        }

        function connectToPort(token, ports) {
            console.log("got the ports to magic server", ports)
            var stream

            ports.protocol = ports.protocol || "net"
            if (ports.protocol === "net") {
                stream = net.connect(ports.port, ports.host)
            } else if (ports.protocol === "http") {
                var uri = "http://" + ports.host + ":" + ports.port
                stream = request(uri)
            }

            var tokenStream = streams[token]
            console.log("got the token stream!", token)
            stream.pipe(tokenStream).pipe(stream)
        }
    }
}