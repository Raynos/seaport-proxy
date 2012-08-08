var seaportServer = require("./seaport")
    , magicServer = require("./magic")
    , server = require("./http")

var boot = require("boot")
    , seaport = require("../..")

var ports = seaport.connect("localhost", 9093)

var sock = boot(ports)
sock.install(server, '/boot')
console.log("sock hooked on", "/boot")