var boot = require("boot")
    , mdm = boot("/boot")
    , seaport = require("../..")
    , ports = seaport(mdm)

var stream = ports.get("magic@1.2.x")
stream.on("data", console.log.bind(console, "[BROWSER]"))

stream.write("hello from browser!")