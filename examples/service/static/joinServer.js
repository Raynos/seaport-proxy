var seaport = require("../../../browser")
    , lazynode = require("lazynode")
    , mdm = require("./index")
    , ports = seaport(mdm)
    , stream

var input = document.getElementById("server-prefix")
    , button = document.getElementById("join-server")
    , output = document.getElementById("output")

button.addEventListener("click", function () {
    var serverName = input.value
        , remote = lazynode.connect({
            createStream: createStream
            , methods: ["time"]
        })

    output.textContent = ""

    setInterval(function () {
        remote.time(function (time) {
            console.log("time?", time)
            var div = document.createElement("div")
            div.textContent = time
            output.appendChild(div)
        })
    }, 1000)

    function createStream() {
        return ports.get(serverName)
    }
})