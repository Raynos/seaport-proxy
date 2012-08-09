var boot = require("boot")

var mdm = boot("/boot")

module.exports = mdm

require("./createServer")
require("./joinServer")