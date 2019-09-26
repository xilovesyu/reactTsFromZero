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