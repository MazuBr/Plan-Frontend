// @ts-check

// import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import vueParser from "vue-eslint-parser"

export default tseslint.config(
  // eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.app.json",
      },
    },
    ignores: ["*.generated.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        sourceType: "module",
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  }
)
