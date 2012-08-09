var  seaport = require("../..")
    , lazynode = require("lazynode")
    , mdm = require("./index")
    , browserList = require("./browserList")
    , ports = seaport(mdm)

var input = document.getElementById("server-prefix")
    , button = document.getElementById("create-server")

button.addEventListener("click", createServer)

function createServer() {
    var serverName = input.value
        , methods = {
            time: time
        }

    browserList.add(serverName, serviceOnProxy)

    function serviceOnProxy() {
        ports.service(serverName, handleStream)
    }

    function handleStream(stream) {
        var up = lazynode(methods)

        stream.pipe(up).pipe(stream)
    }

    function time(cb) {
        cb("[" + serverName + "]: " + new Date().toString())
    }
}