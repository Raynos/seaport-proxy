var shoe = require("shoe")
    , MuxDemux = require("mux-demux")
    , upnode = require("upnode")
    , uuid = require("node-uuid")
    , mdm = MuxDemux()

module.exports = {
    connect: connect
}

function connect(uri) {
    var stream = shoe(uri)
    mdm.pipe(stream).pipe(mdm)
    var upnodeStream = mdm.createStream("upnode")
    var up = upnode.connect({
        createStream: function () {
            return upnodeStream
        }
    })

    return {
        get: get
        , query: query
    }

    function get(role, callback) {
        var key = uuid()
            , stream = mdm.createStream(key)

        callback(stream)

        up(function (remote) {
            console.log("remote", remote, remote.get, key)
            remote.get(role, key)
        })
    }

    function query(role, callback) {
        var key = uuid()
            , stream = mdm.createStream(key)

        callback(stream)

        up(function (remote) {
            remote.query(role, key)
        })
    }
}