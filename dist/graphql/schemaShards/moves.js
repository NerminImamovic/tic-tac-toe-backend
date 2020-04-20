"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const subscriptionManager_1 = require("src/graphql/subscriptionManager");
const auth_1 = require("src/auth");
const db_1 = require("src/db");
const typeDefs = apollo_server_1.gql `
    extend type Mutation {
        " create a new post "
        makeMove(input: InputMakeMove!): Move
    }

    " input to create a move "
    input InputMakeMove {
        gameId: ID
        playerId: ID
        field: String
    }

    type Move {
        id: ID
        gameId: ID
        playerId: ID
        field: String
        Player: PublicUser
        timestamp: String
    }
`;
exports.default = {
    resolvers: {
        Mutation: {
            // create a post
            makeMove: (root, { input }, context) => __awaiter(this, void 0, void 0, function* () {
                // get the user from the context
                const user = yield auth_1.authenticateContext(context);
                // create a new post in the database
                const move = yield db_1.makeMove(input);
                // publish the post to the subscribers
                // publish the post to the subscribers
                console.log(input.gameId);
                const game = yield db_1.getGameById(input.gameId);
                console.log("Game " + JSON.stringify(game));
                subscriptionManager_1.pubsub.publish('liveResult', {
                    liveResult: game,
                });
                return move;
            }),
        },
    },
    typeDefs: [typeDefs],
};
//# sourceMappingURL=moves.js.map