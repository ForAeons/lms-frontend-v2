module.exports = {
	root: true,
	env: {
		browser: true,
		es2020: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json", "./tsconfig.node.json"],
		tsconfigRootDir: __dirname,
	},
	plugins: ["@typescript-eslint", "react-refresh", "formatjs"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
	],
	rules: {
		"@typescript-eslint/dot-notation": "off",
		"@typescript-eslint/method-signature-style": "warn",
		"@typescript-eslint/no-unused-vars": "warn",
		"react-refresh/only-export-components": "warn",
		"formatjs/no-offset": "error",
	},
	ignorePatterns: [
		".eslintrc.cjs",
		"postcss.config.js",
		"tailwind.config.js",
		"vite.config.ts",
		"**/env.ts",
		"**/constants.ts",
		"src/components/**",
	],
	settings: {
		react: {
			version: "detect", // Automatically detect the version of React in your project
		},
	},
};
