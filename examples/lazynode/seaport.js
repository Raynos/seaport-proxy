var seaport = require("seaport")
    , seaportProxy = require("../..")

var seaportServer = seaport.createServer()
seaportServer.listen(9093)
console.log("seaport server listening on port", 9093)

var ports = seaportProxy.connect("localhost", 9093)

module.exports = ports