"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mergeRawSchemas_1 = require("./utils/mergeRawSchemas");
const apollo_server_1 = require("apollo-server");
const schemaShards_1 = require("./schemaShards");
exports.rawSchema = mergeRawSchemas_1.mergeRawSchemas({
    typeDefs: [
        // we create empty main types, we can later extend them in the shards
        apollo_server_1.gql `
                 type Query {
                    _empty: String
                }

                type Mutation {
                    _empty: String
                }

                type Subscription {
                    _empty: String
                }
            `,
    ],
    resolvers: {},
}, schemaShards_1.default);
//# sourceMappingURL=index.js.map