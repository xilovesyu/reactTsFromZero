const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//const env = process.env.NODE_ENV || process.env.WEBPACK_MODE 

module.exports = (env, argv) => {
    console.log(env, argv)
    return {
    mode: argv.mode === 'production' ? 'production' : 'development',
    entry: './index.tsx',
    output: {
      filename: '[name]-[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            compact: false
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|gif|jpg|svg|ico)$/,
                use: 'url-loader?limit=2020480&name=images/[name].[ext]',
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0',
        // open: true, // auto open browser
        port: 3030, // start on port
        //contentBase: buildPath,
        hot: true,
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            filename: 'index.html',
        })
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                compress: {
                    //warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: argv.mode === 'production',
                    collapse_vars: true,
                    reduce_vars: true,
                }
            }
        })]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    }
}
};
