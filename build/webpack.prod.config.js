const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require("./webpack.base.config");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path')
module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/static/"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader']
        }, {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "less-loader"]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: 'css/[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.tpl.html"
        }),
        new CleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        })
    ],
    optimization: {
        // 分离chunks
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                },
            }
        },
        minimizer: [
            // 压缩JS
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false, // 去除警告
                        drop_debugger: true, // 去除debugger
                        drop_console: true // 去除console.log
                    },
                },
                cache: true, // 开启缓存
                parallel: true, // 平行压缩
                sourceMap: false // set to true if you want JS source maps
            }),
            // 压缩css
            new OptimizeCSSAssetsPlugin({})
        ]
    }
})