module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'react/forbid-prop-types': 0,
    'object-curly-newline': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'linebreak-style': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'max-depth': [2, 3],
    'max-len': [1, 150],
    'max-params': [1, { max: 4 }],
    'comma-style': [2, 'last'],
    'comma-spacing': [2, { before: false, after: true }],
    'arrow-spacing': [2, { before: true, after: true }],
    'keyword-spacing': [2, { before: true, after: true }],
    'import/prefer-default-export': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/require-default-props': 0,
    'import/no-unresolved': 0,
    'import/no-cycle': 0,
  },
}