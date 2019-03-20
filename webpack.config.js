const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, "dist/assets/js");
var SRC_DIR = path.resolve(__dirname, "src/client");

var config = {
    mode: 'development',
    entry : {
        main: SRC_DIR + "/main.js",
        cart: SRC_DIR + "/cart.js"},
    output: {
        path: DIST_DIR,
        filename: "[name].min.js"
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets:["es2015"]
                }
            }
        ]
    },
    devServer: {
        port: 5000,
        open: true,
        proxy: {
            "/api": "http://localhost:3000"
        }
    }
};

module.exports = config;