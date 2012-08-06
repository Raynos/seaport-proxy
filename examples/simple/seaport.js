var seaport = require("seaport")

var seaportServer = seaport.createServer({
    secret: "beep boop"
})
seaportServer.listen(9090)
console.log("seaport server listening on port", 9090)