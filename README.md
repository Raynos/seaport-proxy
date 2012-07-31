# seaport-proxy [![build status][1]][2]

Seaport in the browser!

## Example

// browser.js
var seaport = require("seaport-proxy")
    , ports = seaport.connect("/winning")
    , dnode = require("dnode")

ports.get('magic@1.2.x', function (stream) {
    var d = dnode()
    d.on("remote", function (remote) {
        remote.magic(function (magic) {
            console.log("beep boop", magic)
        })
    })
    d.pipe(stream).pipe(d)
})

// server.js
var seaport = require("seaport")
    , http = require("http")
    , server = http.createServer()
    , ports = seaport.connect(9090, { secret: 'beep boop' })

var seaportProxy = require("seaport-proxy")
    , seaportServer = seaportProxy.createServer(ports)

seaportServer.install(server, "/winning")

// magic.js
var seaport = require("seaport")
    , ports = seaport.connect(9090, { secret: 'beep boop' })
    , net = require("net")
    , dnode = require("dnode")

var server = net.createServer(function (stream) {
    var d = dnode({
        magic: function (cb) {
            cb("magic!")
        }
    })
    d.pipe(stream).pipe(d)
})

ports.service('magic@1.2.3', function (port, ready) {
    server.listen(port, ready)
})

## Installation

`npm install seaport-proxy`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/seaport-proxy.png
  [2]: http://travis-ci.org/Raynos/seaport-proxy