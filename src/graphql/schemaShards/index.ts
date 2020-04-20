/**
 * This file merges all of the schemas that belong to different parts of the shards
 */
import games from 'src/graphql/schemaShards/games';
import moves from 'src/graphql/schemaShards/moves';
import users from 'src/graphql/schemaShards/users';
import { mergeRawSchemas } from 'src/graphql/utils/mergeRawSchemas';

export default mergeRawSchemas(
    games,
    users,
    moves,
);
