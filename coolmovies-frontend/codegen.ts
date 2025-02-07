import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.CODEGEN_SCHEMA_PATH || 'schema.json',
  documents: ['./**/*.graphql', './**/*.gql'],
  generates: {
    './generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    './generated/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  config: {
    inputValueDeprecation: true,
  },
};

export default config;
