import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import eslintConfigLove from "eslint-config-love";

export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigLove, // use eslint-config-love
  prettier.configs.recommended,
  {
    ignores: ["node_modules/", "dist/", "jest.config.ts", "src/**/*.test.ts"],
    rules: {
      "prettier/prettier": "error",
      camelcase: "error",
      "spaced-comment": "error",
      quotes: ["error", "single"],
      "no-duplicate-imports": "error",
      "no-unused-vars": "off",
      "no-magic-numbers": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-magic-numbers": "error",
    },
  },
];
