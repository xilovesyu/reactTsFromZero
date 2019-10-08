const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const tsImportPluginFactory= require('ts-import-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//const env = process.env.NODE_ENV || process.env.WEBPACK_MODE

const outputDir = 'dist'
const production = 'production'
const development = 'development'
let currentMode
module.exports = (env, argv) => {
    if(argv.mode && argv.mode === production) {
        currentMode = production
    } else {
        currentMode =development
    }
    console.log('currentMode:', currentMode)
    return {
        mode: argv.mode === 'production' ? 'production' : 'development',
        entry: './index.tsx',
        output: {
            filename: '[name]-[hash].js',
            path: path.resolve(__dirname, outputDir)
        },
        devtool: argv.mode === 'production' ? false: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [{
                        loader: 'style-loader' // creates style nodes from JS strings
                    }, {
                        loader: 'css-loader' // translates CSS into CommonJS
                    }, {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            javascriptEnabled: true // 是否处理js内样式
                        }
                    }]
                },
                {
                    test: /\.css$/,
                    include: [path.join(__dirname, 'node_modules/antd'), /src/],
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                /*{   //antd
                    test:/\.css$/,
                    exclude: /src/,
                    include: path.join(__dirname, '/node_modules/antd'),
                    use:[
                        { loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options:{
                                importLoaders: 1
                            }
                        }
                    ]
                },*/
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            //use babel first and then use ts loader
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                //load on demanded of antd.
                                getCustomTransformers: () => ({
                                    before: [
                                        tsImportPluginFactory({
                                            'libraryName': 'antd',
                                            'libraryDirectory': 'es',
                                            'style': 'css'
                                        })
                                    ]
                                })
                            }
                        }
                    ]
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
            //add clean plugin firstly.
            new CleanWebpackPlugin(),
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
            modules: ['node_modules', path.join(__dirname, './node_modules')],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
        }
    }
}
