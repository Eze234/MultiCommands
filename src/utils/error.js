const err = require("./extras/console.json");
function error({ title: title, code: code, error: e }) {
    if (!title) return;
    if (!code) return;

    let obj = {
        title: title,
        code: code,
        MultiCommands: err[code] || null,
        error: e || null
    }
    return console.log(obj)
}

module.exports = {
    error
}