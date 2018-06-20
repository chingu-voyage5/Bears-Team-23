module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    plugins: ['node', 'vue'],
    extends: ["eslint:recommended", "airbnb-base", "plugin:vue/recommended", 'plugin:prettier/recommended'],
    rules: {
        'no-console': 'off',
        'vue/max-attributes-per-line': 'off',
        'prettier/prettier': ['error', {
            'singleQuote': true
        }],
        "import/no-unresolved": "off",
        "import/extensions": "off"
    }

};