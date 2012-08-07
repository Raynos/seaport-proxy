# seaport-proxy

Seaport in the browser!

## Client Example

``` js
var boot = require("boot")
    , mdm = boot("/boot")
    , seaport = require("seaport-proxy")
    , ports = seaport(mdm)

var stream = ports.get("magic@1.2.x")
stream.on("data", console.log.bind(console, "[BROWSER]"))

stream.write("hello from browser!")
```

## Server example

``` js
var boot = require("boot")
    , seaport = require("seaport")
    , Router = require("routes").Router
    , seaport = require("../..")

var sock = boot(streamHandler)
sock.install(someHttpServer, '/boot')
console.log("sock hooked on", "/boot")

var ports = seaport.connect("localhost", 9093)

var streamRouter = new Router()
streamRouter.addRoute("/seaport/get/:service", ports.get)

function streamHandler(stream) {
    var route = streamRouter.match(stream.meta)
    if (route) {
        route.fn(stream, route.params)
    }
}
```

## Magic service

``` js
var seaport = require("seaport")
    , net = require("net")

var ports = seaport.connect("localhost", 9093)

ports.service("magic@1.2.3", createMagic)

function createMagic(port, done) {
    var server = net.createServer(function (stream) {
        stream.write("hello from magic!")
        stream.on("data", function (data) {
            console.log("[MAGIC]", data.toString())
        })
    })
    server.listen(port, done)
    console.log("magic service hooked on port", port)
}
```

## Installation

`npm install seaport-proxy`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/seaport-proxy.png
  [2]: http://travis-ci.org/Raynos/seaport-proxy