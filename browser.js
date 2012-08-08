var partial = require("ap").partial
    , hat = require("hat")
    , rack = hat.rack(128, 16, 16)

module.exports = seaport

function seaport(mdm) {
    return {
        get: partial(get, mdm)
        , query: partial(query, mdm)
    }
}

function get(mdm, service) {
    return mdm.createStream("/seaport/get/" + service + "/?uuid=" + rack())
}

function query(mdm, service) {
    return mdm.createStream("/seaport/query/" + service + "/?uuid=" + rack())
}