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
const services_1 = require("../../services");
const apollo_server_1 = require("apollo-server");
const subscriptionManager_1 = require("src/graphql/subscriptionManager");
const ticTAcToeGameService = new services_1.TicTacToeGameService();
const userService = new services_1.UserService();
const typeDefs = apollo_server_1.gql `
    enum GameType {
      SINGLEPLAYER
      MULTIPLAYER
    }

    enum GameStatus {
        NOTSTARTED
        INPLAY
        FINISHED
    }

    extend type Query {
        " get all games"
        getGames: [Game]
        " get game by ID "
        game(id: ID!): Game
    }

    extend type Mutation {
        " create a new game "
        createGame(input: InputCreateGame!): Game
        " join game"
        joinGame(input: InputJoinGame!): Game
    }

    extend type Subscription {
        " called when a move is made "
        liveResult: Game
    }

    " input to create a new game "
    input InputCreateGame {
        gameType: GameType
        player1Id: ID
    }

    " input to join game "
    input InputJoinGame {
        gameId: ID
        player2Id: ID
    }

    type Game {
        id: ID,
        player1Id: ID
        player2Id: ID
        Player1: PublicUser
        Player2: PublicUser
        Winner: PublicUser,
        status: GameStatus
        type: GameType
        Moves: [Move]
        player1Fields: [String]
        player2Fields: [String]
        emptyFields: [String]
        timestamp: String
    }

    type GameResult {
        id: ID
        player1Id: ID
        player2Id: ID
        status: GameStatus
        player1Fields: [String]
        player2Fields: [String]
        emptyFields: [String]
    }

`;
exports.default = {
    resolvers: {
        Query: {
            // get games
            getGames: () => ticTAcToeGameService.getGames(),
            // get game by ID
            game: (root, { id }) => ticTAcToeGameService.getGameById(id),
        },
        Mutation: {
            // create a game
            createGame: (root, { input }, context) => __awaiter(this, void 0, void 0, function* () {
                const game = yield ticTAcToeGameService.createGame(input);
                subscriptionManager_1.pubsub.publish('liveResult', {
                    liveResult: game,
                });
                return game;
            }),
            // join game
            joinGame: (root, { input }, context) => __awaiter(this, void 0, void 0, function* () {
                const game = yield ticTAcToeGameService.joinGame(input);
                subscriptionManager_1.pubsub.publish('liveResult', {
                    liveResult: game,
                });
                return game;
            }),
        },
        Subscription: {
            liveResult: {
                subscribe: (root, args, context) => {
                    return subscriptionManager_1.pubsub.asyncIterator('liveResult');
                },
            },
        },
        Game: {
            Player1: (game) => userService.getPublicUser(game.player1Id),
            Player2: (game) => userService.getPublicUser(game.player2Id),
            Moves: (game) => []
        },
    },
    typeDefs: [typeDefs],
};
//# sourceMappingURL=games.js.map