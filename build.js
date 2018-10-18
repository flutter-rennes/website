const fs = require('fs');
const path = require('path');
const del = require('del');
const pug = require('pug');

function clean(output) {
    console.log("[clean] " + output);
    del.sync([output + '/**']);
    fs.mkdirSync(output);
}

function readData(sources) {
    console.log("[read data] json from " + sources);
    var result = {};
    fs.readdirSync(sources).forEach(name => {
        var json = fs.readFileSync(path.join(sources, name), "utf8");
        result[path.basename(name, ".json")] = JSON.parse(json);
    });
    console.log("[read data] > " + JSON.stringify(result));
    return result;
}

function copy(source, destination) {
    console.log("[copy] " + source + " > " + destination);
    if(!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
    }

    fs.readdirSync(source).forEach(element => {
        var output = path.join(destination, element);
        console.log("[copy](file) " + path.join(source, element) + " > " + output);
        fs.createReadStream(path.join(source, element)).pipe(fs.createWriteStream(output));
    });
}

function render(sources,output) {
    console.log("[build] " + sources + " > " + output);
    var template = path.join(sources, 'index.pug');
    var data = readData(path.join(sources,"data"));
    var html = pug.renderFile(template, data);
    fs.writeFileSync(path.join(output, "index.html"), html);

    template = path.join(sources, 'print.pug');
    html = pug.renderFile(template, data);
    fs.writeFileSync(path.join(output, "print.html"), html);
}

const sources = path.join(__dirname, 'src');
const output = path.join(__dirname, 'docs');

module.exports = function() {
    clean(output);
    render(sources, output);
    copy(path.join(sources, "images"), path.join(output, "images"));
}