const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.tsx',
    output: {
      filename: 'bundle.js',
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
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    }
}