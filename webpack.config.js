const { resolve } = require("path");
const uglify = require("uglifyjs-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: {
        index: [resolve(__dirname, "./src/js/index.js")],
    },
    output: {
        path: resolve(__dirname + "/dist"),
        filename: "js/[name].js"
    },
    module: {
        rules: [{
                test: /\.txt$/,
                loader: "raw-loader",
                include: resolve(__dirname, "src/text")
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: resolve(__dirname, "node_modules"),
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },
            {
                test: /.scss$/,
                use: [{
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV == "development"
                        }
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function() {
                                return [autoprefixer("last 10 versions")]
                            }
                        }
                    },
                    "sass-loader"
                ]

            },
            {
                test: /.(png|jpg|jpeg|gif|ico)$/i,
                loader: [
                    'url-loader?limit=1024&name=imgs/[name]-[hash:16].[ext]',
                    "img-webpack-loader"
                ]
            }
        ]
    },
    plugins: [
        new uglify(),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: 'index.html',
            template: resolve(__dirname, 'src/index.html'),
            title: "模板首页",
            chunksSortMode: "manual",
            chunks: ["common", "index"],
            excloudeChunks: ["node_modules"],
            hash: true,
            ie8: true,

        }),
        new miniCssExtractPlugin({
            filename: "css/[name].css"
        }),

    ],
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        },
        host: "localhost",
        port: 3000
    }

}