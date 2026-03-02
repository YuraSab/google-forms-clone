import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/store/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-rtk-query"
      ],
      config: {
        importBaseApiFrom: "../api/baseApi",
        importBaseApiValue: "api",
        exportHooks: true
      }
    }
  }
};

export default config;