### Guide to start a new project.

1. first step yarn init
2. yarn add typescipt and tsc --init
3. yarn add webpack webpack-cli webpack-dev-server
4. touch webpack.config.js

5. mkdir src/components src/stores
6. yarn add react react-dom @types/react @types/react-dom
7. write a component

```jsx
import * as React from 'react'

export class Index extends React.Component<any, any> {
    render(): React.ReactNode {
        return (<div>hello world</div>)
    }
}
```
write index.tsx as the entry of the package.

```jsx
import ReactDOM from 'react-dom'
import * as React from 'react'
import {Index} from './src/components/Index'

ReactDOM.render(<Index />, document.getElementById('container'))
```

modify tsconfig.json

```js
 "jsx": "preserve",      
```

8. yarn add @babel/core @babel/cli @babel/preset-env @babel/polyfill @babel/runtime @babel/plugin-transform-runtime @babel/preset-react  @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties babel-loader
9. touch .babelrc

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": [
                        ">0.25%",
                        "ie >= 11"
                    ]
                },
                "modules": false,
                "useBuiltIns": "entry",
                "corejs": "3.0.0"
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        [
            "@babel/plugin-proposal-class-properties",
            {
                "loose": true
            }
        ],
        "@babel/plugin-transform-runtime"
    ]
}
```

10. touch a index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello World</title>
</head>

<body>
    <div id="container"></div>
</body>

</html>
```

11. update webpack.config.js

```js
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
```