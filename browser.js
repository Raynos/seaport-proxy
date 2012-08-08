var partial = require("ap").partial
    , hat = require("hat")
    , rack = hat.rack(128, 16, 16)

module.exports = seaport

function seaport(mdm, prefix) {
    prefix = prefix || "/seaport"

    return {
        get: get
        , query: query
    }

    function get(service) {
        return mdm.createStream(prefix + "/get/" + service +
            "/?uuid=" + rack())
    }

    function query(service) {
        return mdm.createStream(prefix + "/query/" + service +
            "/?uuid=" + rack())
    }
}