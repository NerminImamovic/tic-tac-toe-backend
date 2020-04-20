"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file merges all of the schemas that belong to different parts of the shards
 */
const games_1 = require("src/graphql/schemaShards/games");
const moves_1 = require("src/graphql/schemaShards/moves");
const users_1 = require("src/graphql/schemaShards/users");
const posts_1 = require("src/graphql/schemaShards/posts");
const mergeRawSchemas_1 = require("src/graphql/utils/mergeRawSchemas");
exports.default = mergeRawSchemas_1.mergeRawSchemas(games_1.default, users_1.default, posts_1.default, moves_1.default);
//# sourceMappingURL=index.js.map