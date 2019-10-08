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

12. update eslint
 yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
 
 ```js
module.exports = {
    parser:  '@typescript-eslint/parser', //定义ESLint的解析器
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],//定义文件继承的子规范
    plugins: ['@typescript-eslint'],//定义了该eslint文件所依赖的插件
    env:{                          //指定代码的运行环境
        browser: true,
        node: true,
    },
    settings: {             //自动发现React的版本，从而进行规范react代码
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    },
    parserOptions: {        //指定ESLint可以解析JSX语法
        "ecmaVersion": 2019,
        "sourceType": 'module',
        "ecmaFeatures":{
            jsx:true
        }
    },
    rules: {
        "eqeqeq": "error",
        "semi": ["error", "never"],
        "camelcase": [0, {"properties": "never"}], //for eslint
        "@typescript-eslint/camelcase": 0, //for typescript
        "quotes": ["error", "single"],
        "no-var-requires": "off",
        "@typescript-eslint/no-var-requires": 0, //for typescript
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
    }
};
```
modified the package.json 
```json
"scripts": {
  "lint": "eslint --ext .js,.ts,.tsx index.tsx webpack.config.js src/"
}
```

13. antd
`yarn add antd`
then 
we can import components in index.tsx

```typescript jsx
import { Avatar, Button, Input } from 'antd'
```

But this way will import all components not just(Avatar, Button, Input). So we need to load based on our demand.

We use `yarn add awesome-typescript-loader ts-import-plugin` to fix this problem.

Change tsx rules as following:
```javascript
const tsImportPluginFactory= require('ts-import-plugin')

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
}
```
modify tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES6",  /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "esnext",       
    "jsx": "preserve",   //use react to translate jsx by typescript not babel.
    "moduleResolution": "node",    
    "esModuleInterop": true        
  }
}
```

14. Add clean webpack plugin

```bash
yarn add clean-webpack-plugin
```
in webpack.config.js
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports= {
    plugins: [
            //add clean plugin firstly.
            new CleanWebpackPlugin()
    ]
}
```
