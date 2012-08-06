var boot = require("boot")
    , mdm = boot("/boot")

var seaportProxyStream = mdm.createStream("/seaport-proxy/get/magic@1.2.x")

seaportProxyStream.on("data", function (data) {
    console.log("[BROWSER]", data.toString())
})

seaportProxyStream.write("hello from browser!")