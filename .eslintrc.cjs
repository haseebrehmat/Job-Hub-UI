module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'arrow-parens': 'off',
        'import/no-unresolved': 'off',
        'jsx-quotes': [2, 'prefer-single'],
        'react/function-component-definition': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-one-expression-per-line': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        semi: [2, 'never'],
        'react/no-unstable-nested-components': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'no-debugger': 'off',
        'react/prefer-stateless-function': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-no-bind': 'off',
        'no-restricted-globals': 'off',
        'no-alert': 'off',
        'react/button-has-type': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'no-plusplus': 'off',
        'no-param-reassign': 'off',
        'react/jsx-wrap-multilines': 'off',
        'react/jsx-closing-tag-location': 'off',
        'no-console': 'off', // consoles
        'max-len': 'off', // max-length
        'no-return-assign': 'off', // var = value
        'import/prefer-default-export': 'off', // default export
        'import/order': 'off', // import order,
        'react/no-array-index-key': 'off', // index as key
        camelcase: 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'import/extensions': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'no-nested-ternary': 'off',
        'react/style-prop-object': 'off',
    },
}
