module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
	settings: {
		react: {
			version: '18.2.0'
		}
	},
	plugins: ['react', 'prettier'],
	ignorePatterns: ['js/lib/**', 'dist/**'],
	overrides: [
		{
			files: ['**/*.js', '**/*.jsx'],
			rules: {
				'prettier/prettier': 'error',
				quotes: ['error', 'single'],
				semi: ['error', 'always'],
				'no-undef': 'off',
				'no-redeclare': 'warn',
				'no-unused-vars': 'warn',
				'no-trailing-spaces': 'error',
				'no-unreachable': 'warn',
				'no-prototype-builtins': 'warn',
				'no-useless-escape': 'warn',
				'no-fallthrough': 'warn',
				'no-cond-assign': 'warn',
				'no-empty': 'warn',
				'no-misleading-character-class': 'warn',
				'no-func-assign': 'warn',
				'no-inner-declarations': 'warn',
				'no-unexpected-multiline': 'warn',
				'react/prop-types': 'off',
				'react/no-unknown-property': ['error', { ignore: ['css'] }]
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	}
};
