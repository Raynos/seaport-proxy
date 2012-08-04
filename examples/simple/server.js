var seaport = require("seaport")
    , http = require("http")
    , path = require("path")
    , ecstatic = require("ecstatic")(path.join(__dirname, "static"))
    , server = http.createServer(ecstatic)
    , ports = seaport.connect(9092, { secret: 'beep boop' })
    , seaportProxy = require("../..")

server.listen(8080)

console.log("listening on port 8080")

seaportProxy(ports, server, "/winning")