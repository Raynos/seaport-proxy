var seaport = require("seaport-stream")
    , upnode = require("upnode")

var ports = seaport.connect("localhost", 9093)

ports.service("magic@1.2.3", createMagic)

function createMagic(stream) {
    var up = upnode({
        time: function (cb) {
            cb(new Date().toString())
        }
    })
    up.pipe(stream).pipe(up)
}