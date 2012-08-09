var seaport = require("../..")
    , lazynode = require("lazynode")
    , mdm = require("./index")
    , ports = seaport(mdm)
    , stream

var input = document.getElementById("server-prefix")
    , button = document.getElementById("join-server")
    , output = document.getElementById("output")

button.addEventListener("click", function () {
    var serverName = input.value
        , remote = lazynode({
            createStream: createStream
            , methods: ["time"]
        })

    output.textContent = ""

    setInterval(render, 1000)

    function createStream() {
        return ports.get(serverName)
    }

    function render() {
        remote.time(renderTime)
    }

    function renderTime(time) {
        var div = document.createElement("div")
        div.textContent = time
        output.appendChild(div)
    }
})