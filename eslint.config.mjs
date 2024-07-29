// @ts-check

import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import vueParser from "vue-eslint-parser"

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        sourceType: "module",
        parser: tseslint.parser,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  }
)
