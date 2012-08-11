var  seaport = require("../../../browser")
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
        console.log("browserlist returned")
        ports.service(serverName, handleStream)
    }

    function handleStream(stream) {
        console.log("handling stream", stream)
        var up = lazynode(methods)

        stream.pipe(up).pipe(stream)
    }

    function time(cb) {
        cb("[" + serverName + "]: " + new Date().toString())
    }
}