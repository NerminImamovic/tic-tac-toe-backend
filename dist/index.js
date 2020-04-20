"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const graphql_tools_1 = require("graphql-tools");
const index_1 = require("src/auth/index");
const graphql_1 = require("./graphql");
const port = process.env.PORT || 3000;
// create our schema
const schema = graphql_tools_1.makeExecutableSchema(graphql_1.rawSchema);
// configure the server here
const serverConfig = {
    schema,
    context: index_1.handleGraphQLContext,
    subscriptions: {
        onConnect: index_1.handleGraphQLSubscriptionContext,
    },
    playground: {
        settings: {
            'editor.theme': 'dark',
            'editor.cursorShape': 'line',
        },
    },
};
// create a new server
const server = new apollo_server_1.ApolloServer(serverConfig);
server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map