var seaport = require("../..")
    , ports = seaport.connect("/winning")
    , dnode = require("dnode")

ports.get('magic@1.2.x', function (stream) {
    console.log("connected to magic ports", stream)
    console.dir(stream)

    var d = dnode()
        , result = document.getElementById("result")
        
    d.on("remote", function (remote) {
        console.log("got the remote!", remote, remote.magic)
        console.dir(remote)
        remote.magic(function (err, magic) {
            console.log("got magic result!", magic)
            result.textContent += magic
        })
    })
    d.pipe(stream).pipe(d)
})