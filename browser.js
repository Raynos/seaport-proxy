var partial = require("ap").partial

module.exports = seaport

function seaport(mdm) {
    return {
        get: partial(get, mdm)
        , query: partial(query, mdm)
    }
}

function get(mdm, service) {
    return mdm.createStream("/seaport/get/" + service)
}

function query(mdm, service) {
    return mdm.createStream("/seaport/query/" + service)
}