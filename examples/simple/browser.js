var seaport = require("../..")
    , ports = seaport.connect("/winning")
    , dnode = require("dnode")

ports.get('magic@1.2.x', function (stream) {
    console.log("got stream", stream)
    var result = document.getElementById("result")

    stream.on("data", function (data) {
        console.log("got data", data)
        result.textContent += data
    })
})