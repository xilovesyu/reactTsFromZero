const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
        mode: currentMode,
        entry: './index.tsx',
        output: {
            filename: '[name]-[hash].js',
            path: path.resolve(__dirname, outputDir)
        },
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        },
        devtool: currentMode === 'production' ? false: 'inline-source-map',
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
                        MiniCssExtractPlugin.loader,
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
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new BundleAnalyzerPlugin({ analyzerPort: 8081 })
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
                        drop_console: currentMode === 'production',
                        collapse_vars: true,
                        reduce_vars: true,
                    }
                }
            })]
        },
        resolve: {
            modules: ['node_modules', path.join(__dirname, './node_modules')],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
            alias: {
                '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/utils/antdIcons.js')
            }
        },
    }
}
