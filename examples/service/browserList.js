var lazynode = require("lazynode")
    , list = []

module.exports = browserList

function browserList(stream) {
    var up = lazynode({
        add: function (id, cb) {
            list.push(id)
            cb && cb(null)
        }
        , get: function (cb) {
            cb(list)
        }
    })
    up.pipe(stream).pipe(up)
}