const fs = require("fs");

function sources(path) {
    const files = fs.readdirSync(path) || [];
    let r = "";

    files.forEach(function(file) {
        if (fs.statSync(path + file).isDirectory()) {
            r += sources(path + file + "/");
        } else if (fs.statSync(path + file).isFile()) {
            const isSource = file.lastIndexOf(".ts") === file.length - 3;
            const isDefinition = file.lastIndexOf(".d.ts") === file.length - 5;

            if (isSource && !isDefinition) {
                r += path + file + "\n";
            }
        }
    });

    return r;
}

fs.writeFileSync("./translations/sources", sources("./src/"), "utf8");
