yarn create react-app modulo05
yarn add eslint -D
yarn eslint --init
yarn
yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D

```js
extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react'
  ],

parser:'babel-eslint', //antes do parserOptions

plugins: ["react", "prettier"],

rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": ["warn", { extension: [".jsx", ".js"] }],
    "import/prefer-default-export": "off"
  }
```

yarn add react-router-dom
yarn add styled-components

yarn add react-icons

yarn add axios

yarn add prop-types
