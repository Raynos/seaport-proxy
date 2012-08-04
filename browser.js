var boot = require("boot")

module.exports = {
    connect: connect
}

function connect(uri) {
    var mdm = boot(uri)

    return {
        get: get
    }

    function get(role, callback) {
        var stream = mdm.createStream("seaport-proxy-get-" + role)

        callback(stream)
    }
}