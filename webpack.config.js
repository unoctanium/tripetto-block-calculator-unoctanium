const webpack = require("webpack");
const webpackLiveReload = require("webpack-livereload-plugin");
const path = require("path");
const package = require("./package.json");
const externals = require("webpack-node-externals");

const config = (type, target) => {
    return {
        entry:
            type === "collector"
                ? "./src/collector/index.ts"
                : "./src/index.ts",
        output:
            type === "collector"
                ? {
                      filename: "index.js",
                      path: path.resolve(__dirname, "collector", target || ""),
                      libraryTarget: "umd",
                      library: JSON.stringify(package.name)
                  }
                : {
                      filename: target === "umd" ? "umd.js" : target + ".js",
                      path: path.resolve(__dirname, "dist")
                  },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader",
                    options: {
                        compilerOptions: {
                            noEmit: false,
                            target: target === "es6" ? "ES6" : "ES5",
                            module: target === "es6" ? "es6" : "commonjs",
                            outDir: "./collector" + (target ? "/" + target : "")
                        },
                        configFile: type === "collector" ? "tsconfig.collector.json" : "tsconfig.json"
                    }
                },
                {
                    test: /\.svg$/,
                    use: [
                        "url-loader",
                        "image-webpack-loader?{svgo:{plugins:[{cleanupAttrs: true},{removeDoctype: true},{removeXMLProcInst: true},{removeComments: true},{removeMetadata: true},{removeTitle: true},{removeDesc:{removeAny: true}}]}}"
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        externals:
            target === "umd"
                ? {
                      tripetto: "Tripetto"
                  }
                : [externals()],
        plugins: [
            new webpack.DefinePlugin({
                PACKAGE_NAME: JSON.stringify(package.name),
                PACKAGE_VERSION: JSON.stringify(package.version)
            }),
            ...(type === "umd"
                ? [
                      new webpackLiveReload({
                          appendScriptTag: true
                      })
                  ]
                : [])
        ]
    };
};

module.exports = (env, argv) => {
    return [
        config("editor", "umd"),
        ...(argv.mode === "production"
            ? [config("editor", "es5"), config("editor", "es6"), config("collector"), config("collector", "es5"), config("collector", "es6")]
            : [])
    ];
};
