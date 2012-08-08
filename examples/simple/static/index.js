var boot = require("boot")
    , seaport = require("../..")
    , ports = seaport(boot("/boot"))

var stream = ports.get("magic@1.2.x")
stream.on("data", console.log.bind(console, "[BROWSER]"))

stream.write("hello from browser!")