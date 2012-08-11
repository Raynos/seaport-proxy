var seaport = require("seaport-stream")
    , lazynode = require("lazynode")
    , methods = {
        time: function (cb) {
            cb(new Date().toString())
        }
    }

var ports = seaport.connect("localhost", 9093)

ports.service("magic@1.2.3", createMagic)

function createMagic(stream) {
    var up = lazynode(methods)
    up.pipe(stream).pipe(up)
}