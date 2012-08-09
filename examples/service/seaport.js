var seaport = require("seaport")

var seaportServer = seaport.createServer()
seaportServer.listen(9093)
console.log("seaport server listening on port", 9093)