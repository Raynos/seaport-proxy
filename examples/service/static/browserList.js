var lazynode = require("lazynode")
    , mdm = require("./index")
    , rack = require("hat").rack(128, 16, 16)

var button = document.getElementById("update-browser-list")
    , output = document.getElementById("browser-list")

var browserList = module.exports = lazynode.connect({
    createStream: createStream
    , methods: ["add", "get"]
})

button.addEventListener("click", refreshList)

function refreshList() {
    console.log("calling get on browserList")
    browserList.get(render)

    function render(list) {
        console.log("got render")
        output.textContent = Object.keys(list).join(",")
    }
}

function createStream() {
    return mdm.createStream("/browserList/" + rack())
}