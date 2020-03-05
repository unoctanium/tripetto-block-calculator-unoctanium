const fs = require("fs");
const path = require("path");
const po2json = require("po2json");
const prettier = require("prettier");

function convert(folder) {
    const files = fs.readdirSync(folder) || [];

    files.forEach(function(file) {
        if (fs.statSync(folder + file).isFile()) {
            const isPO = file.lastIndexOf(".po") === file.length - 3;

            if (isPO) {
                fs.writeFileSync(
                    folder + path.basename(file, ".po") + ".json",
                    prettier.format(JSON.stringify(po2json.parseFileSync(folder + file)), {
                        parser: "json"
                    }),
                    "utf8"
                );

                console.log(`po2json: ${folder + file} -> ${folder + path.basename(file, ".po") + ".json"}`);
            }
        }
    });
}

convert("./translations/");
