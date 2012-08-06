var http = require("http")
    , net = require("net")
    , boot = require("boot")
    , browserify = require("browserify")
    , ecstatic = require("ecstatic")(__dirname + "/static")
    , Router = require("routes").Router
    , seaport = require("seaport")
    , net = require("net")
    , path = require("path")
    , seaportServer = require("./seaport")
    , magicServer = require("./magic")
    , from = require("from")

var httpRouter = new Router()
httpRouter.addRoute("/", ecstatic)
httpRouter.addRoute("/bundle.js", bundleBrowserify)

var server = http.createServer(httpHandler)
server.listen(8080)
console.log("listening on port", 8080)

var streamRouter = new Router()
streamRouter.addRoute("/seaport-proxy/get/:service", seaportProxy)

var sock = boot(streamHandler)
sock.install(server, '/boot')
console.log("sock hooked on", "/boot")

var ports = seaport.connect("localhost", 9090, {
    secret: "beep boop"
})

function streamHandler(stream) {
    var route = streamRouter.match(stream.meta)
    if (route) {
        route.fn(stream, route.params)
    }
}

function httpHandler(req, res) {
    var route = httpRouter.match(req.url)
    if (route) {
        route.fn(req, res)
    }
}

function bundleBrowserify(req, res) {
    var b = browserify()
    b.addEntry(path.join(__dirname, "client.js"))
    res.setHeader("content-type", "application/jsonn")
    try {
        res.end(b.bundle())
    } catch (err) {
        res.statusCode = 500
        res.end(err.message)
    }
}

function seaportProxy(browserStream, params) {
    console.log("incoming service", params)
    var serviceName = params.service

    browserStream.on("data", function (data) {
        console.log("got data from browserStream", data)
    })

    ports.get(serviceName, function (ports) {
        console.log("got ports", ports)
        var client = net.connect(ports[0].port, ports[0].host)
        browserStream.pipe(client)
        var fakeClient = from(function (count, next) {
            this.emit("data", "hello " + count)

            setTimeout(next, 500)
        })
        fakeClient.pipe(browserStream)
        // Hooking the client up freezes the browser and spinlocks your CPUs
        // WTF >:(
        //client.pipe(browserStream)
        console.log("piped it up!")
        client.on("data", function (data) {
            console.log("got data from magic", data.toString())
        })
    })
}