var http = require("http")
    , path = require("path")
    , browserify = require("browserify")
    , ecstatic = require("ecstatic")(__dirname + "/static")
    , Router = require("routes").Router

var httpRouter = new Router()
httpRouter.addRoute("/", ecstatic)
httpRouter.addRoute("/bundle.js", bundleBrowserify)

var server = module.exports = http.createServer(httpHandler)

server.listen(8080)
console.log("listening on port", 8080)

function httpHandler(req, res) {
    var route = httpRouter.match(req.url)
    if (route) {
        route.fn(req, res)
    }
}

function bundleBrowserify(req, res) {
    var b = browserify()
    b.addEntry(path.join(__dirname, "client.js"))
    res.setHeader("content-type", "application/jsonn")
    try {
        res.end(b.bundle())
    } catch (err) {
        res.statusCode = 500
        res.end(err.message)
    }
}