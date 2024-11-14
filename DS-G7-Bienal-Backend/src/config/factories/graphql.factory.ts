import { ConfigurationsInterface } from '@interfaces';
import { ConfigService } from '@nestjs/config';
import GraphQLJSON from 'graphql-type-json';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLFormattedError } from 'graphql';

export const graphQLFactory = async (config: ConfigService<ConfigurationsInterface>) => {
  const plugins = config.get('ENVIRONMENT').toUpperCase() === 'LOCAL'
    ? [ApolloServerPluginLandingPageLocalDefault()]
    : [];

  return {
    typeDefs: `scalar JSON`,  // Agregar el tipo JSON manualmente
    resolvers: { JSON: GraphQLJSON },  // Resolver para el tipo JSON
    autoSchemaFile: join(process.cwd(), 'src/applications/graph-ql/schema.gql'),
    playground: false,
    subscriptions: {
      'graphql-ws': true,
    },
    plugins,
    formatError: (formattedError: GraphQLFormattedError, error: Error) => {
      let newError: any;
      try {
        newError = JSON.parse(error.message);
      } catch (error) {
        newError = error?.message;
      }
      return {
        message: newError?.payload || 'Errors',
        code: newError?.message || formattedError.extensions?.code,
      };
    },
  };
};
