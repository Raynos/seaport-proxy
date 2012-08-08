# seaport-proxy

Seaport in the browser!

## Client Example

``` js
var boot = require("boot")
    , seaport = require("seaport-proxy")

var ports = seaport(boot("/boot"))

var stream = ports.get("magic@1.2.x")
stream.on("data", console.log.bind(console, "[BROWSER]"))

stream.write("hello from browser!")
```

Create a client connection to the seaport server as long as the seaport proxy is running on the server.

## Server example

``` js
var boot = require("boot")
    , seaport = require("seaport-proxy")

var ports = seaport.connect("localhost", 9093)

var sock = boot(ports)
sock.install(someHttpServer, '/boot')
console.log("sock hooked on", "/boot")
```

Creates a seaport proxy on the server so that the browser can talk to seaport.

## Magic service

``` js
var seaport = require("seaport-stream")
    , net = require("net")

var ports = seaport.connect("localhost", 9093)

ports.service("magic@1.2.3", createMagic)

function createMagic(stream) {
    stream.write("hello from magic!")
    stream.on("data", function (data) {
        console.log("[MAGIC]", data.toString())
    })
}
```

Expose a service over seaport that the browser can talk to. Use seaport-stream because you don't care about the IO and only about the stream

## Installation

`npm install seaport-proxy`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/seaport-proxy.png
  [2]: http://travis-ci.org/Raynos/seaport-proxy