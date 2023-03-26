module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"ignorePatterns": [
		"js/lib/**",
		"dist/**"
	],
	"overrides": [
		{
			"files": ["**/*.js"],
			"rules": {
				"indent": [
					"error",
					"tab"
				],
				"quotes": [
					"error",
					"double"
				],
				"semi": [
					"error",
					"always"
				],
				"no-undef": "off",
				"no-unused-vars": "warn",
				"no-redeclare": "off",
				"no-unreachable": "warn",
				"no-prototype-builtins": "warn",
				"no-useless-escape": "warn",
				"no-fallthrough": "warn",
				"no-cond-assign": "warn",
				"no-empty": "warn",
				"no-misleading-character-class": "warn",
				"no-func-assign": "warn",
				"no-inner-declarations": "warn",
				"no-unexpected-multiline": "warn"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	}
};