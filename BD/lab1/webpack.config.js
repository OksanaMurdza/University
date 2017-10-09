const webpack = require("webpack");
const path = require("path");

const prod = ~process.argv.indexOf('-p');
console.log('__dirname >>', __dirname)

const config = {
    
    context: __dirname + "/src/",
    devtool: "eval",
    output: {
        path: __dirname + "/src/build",
        filename: "bundle.js",
        publicPath: "/",    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader',],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                    //include 'isomorphic-style-loader'
                    // loader: "isomorphic-style-loader"
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.png$/,
                use: "file-loader"
            },
            {
                test: /\.gif$/,
                use: "file-loader"
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        context: "/assets/img/"
                    }
                }]
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        compress: true,
        hot: true,
        stats: { colors: true },
        contentBase: path.join(__dirname, "src"),
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: true,
        proxy: {
            // "/regr": "http://localhost:8000/regr",
            //     "/region": "http://localhost:8000",
            //     "/getsubmenu": "http://localhost:8000",
            //     "/getmapdata": "http://localhost:8000",
            //     "/render": "http://localhost:8000",
            //     "/claster_layers": "http://localhost:8000",
            //     "/data_bubble": "http://localhost:8000",
            //     "/ato": "http://localhost:8000",
            //     "/info": "http://localhost:8000",
            //     "/kadastr": "http://localhost:8000",
            //     "/views": "http://localhost:8000",
            //     "/": "http://localhost:8000"
        }
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
    }
};

if (prod) {
    config.entry = [
        'react-hot-loader/patch',
        // activate HMR for React
        
        //for prod
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        "js/index.js",
        "scss/index.scss"
    ]
} else {
    config.entry = [
        'react-hot-loader/patch',
        // activate HMR for React
        
        // 'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        "js/index.js",
        "scss/index.scss"
    ]
}

module.exports = config;

