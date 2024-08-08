import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "./schema.json",
  // schema: "https://plan-backend-71h9.onrender.com/api/graphql",
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "src/shared/api/gql/graphql.ts": {
      plugins: [
        "typescript",
        {
          add: {
            content: "// prettier-ignore",
          },
        },
      ],
    },
    "src/": {
      preset: "near-operation-file-preset",
      documents: ["src/**/*.gql"],
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "shared/api/gql/graphql.ts",
        folder: "../api",
      },
      config: {},
      plugins: [
        {
          "typescript-operations": {
            avoidOptionals: true,
          },
        },
        {
          add: {
            content: "// prettier-ignore",
          },
        },
        "typed-document-node",
      ],
    },
  },
}

export default config
