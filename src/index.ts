import { ApolloServer, Config, CorsOptions } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { handleGraphQLContext, handleGraphQLSubscriptionContext } from 'src/auth/index';
import { rawSchema } from './graphql';

const port = process.env.PORT || 4000;

// create our schema
const schema = makeExecutableSchema(rawSchema);

// configure the server here
const serverConfig: Config & { cors?: CorsOptions | boolean } = {
  cors: true,
  schema,
  context: handleGraphQLContext,
  subscriptions: {
    onConnect: handleGraphQLSubscriptionContext as any,
  },
  playground: {
    settings: {
      'editor.theme': 'dark', // change to light if you prefer
      'editor.cursorShape': 'line', // possible values: 'line', 'block', 'underline'
    },
  },
};

// create a new server
const server = new ApolloServer(serverConfig);
server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
