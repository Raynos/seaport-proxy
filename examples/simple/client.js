var boot = require("boot")
    , mdm = boot("/boot")

var seaportProxyStream = mdm.createStream("/seaport-proxy/get/magic@1.2.x")

seaportProxyStream.on("data", function (data) {
    console.log("got data :(")
    console.log("data from stream", data.toString())
})

seaportProxyStream.write("data into stream")