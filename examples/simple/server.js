var ports = require("./seaport")
    , magicServer = require("./magic")
    , server = require("./http")

var boot = require("boot")

var sock = boot(ports)
sock.install(server, '/boot')
console.log("sock hooked on", "/boot")