var path = require("path")
    , http = require("http")
    , browserifyServer = require("browserify-server")

var handler = browserifyServer(path.join(__dirname, "static"))
    , server = http.createServer(handler).listen(8080)

module.exports = server

console.log("server listening on port", 8080)