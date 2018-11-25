const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.config");

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["vue-style-loader", "css-loader", 'postcss-loader']
        }, {
            test: /\.less$/,
            use: ["vue-style-loader", "css-loader", 'postcss-loader', "less-loader"]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.tpl.html"
        })

    ]
})