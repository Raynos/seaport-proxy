var seaport = require("seaport")

var seaportServer = seaport.createServer({
    secret: "beep boop"
})
seaportServer.listen(9093)
console.log("seaport server listening on port", 9093)