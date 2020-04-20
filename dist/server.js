/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/auth/index.ts":
/*!***************************!*\
  !*** ./src/auth/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __webpack_require__(/*! src/db */ "./src/db/index.ts");
// handle all of the token magic here
function createContext(token) {
    return {
        token,
    };
}
// create context for requests
function handleGraphQLContext(ctx) {
    const { req, connection } = ctx;
    // we already connected with a subscription
    if (connection) {
        return connection.context;
    }
    // check the request for the token
    const token = req.headers && req.headers.token;
    return createContext(token);
}
exports.handleGraphQLContext = handleGraphQLContext;
// handle authentication for socket connections
function handleGraphQLSubscriptionContext(connectionParams, webSocket) {
    const token = connectionParams.authToken;
    return createContext(token);
}
exports.handleGraphQLSubscriptionContext = handleGraphQLSubscriptionContext;
// check if the user is logged in or whatever you want to do to authenticate the user
function authenticateContext(context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!context.token) {
            // too bad 👎
            throw new Error('user is not logged in');
        }
        const user = yield db_1.getUserByToken(context.token);
        if (!user) {
            // too bad 👎
            throw new Error('invalid token');
        }
        // yay 👍
        return user;
    });
}
exports.authenticateContext = authenticateContext;


/***/ }),

/***/ "./src/db/index.ts":
/*!*************************!*\
  !*** ./src/db/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __webpack_require__(/*! lodash */ "lodash");
const lowdb = __webpack_require__(/*! lowdb */ "lowdb");
const FileSync = __webpack_require__(/*! lowdb/adapters/FileSync */ "lowdb/adapters/FileSync");
const jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const lib_1 = __webpack_require__(/*! ../lib */ "./src/lib/index.ts");
/*
* NOTICE! these secrets are here for simplicity,
* please don't save secrets inside your code,
* but in environment variables or config files that will not be in the repository
*
* this entire file is only to mock a local database. it is not ment to act as a real database.
*/
// some salt for hashing the password
const hashSalt = '$2a$10$7h/0SQ4FXRG5eX3602o3/.aO.RYkxKuhGkzvIXHLUiMJlFt1P.6Pe';
// a secret for signing with jwt
const jwtSecret = 'oCDSF$#%$#%dfsvdgfd#@$3f';
// our database
const adapter = new FileSync('db.json');
const db = lowdb(adapter);
db.defaults({
    users: [],
    games: [],
    moves: [],
}).write();
const ticTacToeGame = new lib_1.TicTacToeGame();
// get a user's public data by it's id.
function getPublicUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = db.get('users')
            .find({ id })
            .value();
        return user;
    });
}
exports.getPublicUser = getPublicUser;
// gets a user by it's password and email.
function getUserByPasswordAndEmail(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, email } = input;
        const hash = bcrypt.hashSync(password, hashSalt);
        const user = db.get('users')
            .find({ email, password: hash })
            .value();
        return user;
    });
}
exports.getUserByPasswordAndEmail = getUserByPasswordAndEmail;
// get a user by it's token
function getUserByToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = db.get('users')
            .find({ token })
            .value();
        return user;
    });
}
exports.getUserByToken = getUserByToken;
function registerUser(userInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = userInput;
        const existingUser = db
            .get('users')
            .find({ email })
            .value();
        if (existingUser) {
            throw new Error('user already exist');
        }
        const id = uuid_1.v4();
        const hash = bcrypt.hashSync(password, hashSalt);
        const token = jsonwebtoken.sign({ id }, jwtSecret);
        const user = Object.assign(Object.assign({}, userInput), { id,
            token, password: hash, type: "REAL" /* REAL */ });
        db.get('users')
            .push(user)
            .write();
        return user;
    });
}
exports.registerUser = registerUser;
function createAIUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = {
            id: uuid_1.v4(),
            name: 'COMPUTER',
            type: "COMPUTER" /* COMPUTER */,
        };
        db.get('users')
            .push(user)
            .write();
        return user;
    });
}
exports.createAIUser = createAIUser;
// get all games
function getGames() {
    return __awaiter(this, void 0, void 0, function* () {
        return db.get('games')
            .value();
    });
}
exports.getGames = getGames;
// get a game by Id
function getGameById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const game = db.get('games')
            .find({ id })
            .value();
        return game;
    });
}
exports.getGameById = getGameById;
// create a new game
function createGame(inputCreateGame) {
    return __awaiter(this, void 0, void 0, function* () {
        const game = Object.assign(Object.assign({}, inputCreateGame), { id: uuid_1.v4(), timestamp: new Date().toUTCString(), status: "NOTSTARTED" /* NOTSTARTED */ });
        db.get('games')
            .push(game)
            .write();
        return game;
    });
}
exports.createGame = createGame;
// join game
function joinGame(inputJoinGame) {
    return __awaiter(this, void 0, void 0, function* () {
        const gameId = _.get(inputJoinGame, 'gameId');
        const player2Id = _.get(inputJoinGame, 'player2Id');
        const game = yield getGameById(gameId);
        return db.get('games')
            .find({ id: gameId })
            .assign({
            nextTurnPlayerId: _.get(game, 'player1Id'),
            player2Id,
            emptyFields: [...Array(9).keys()].map(i => i),
            status: "INPLAY" /* INPLAY */,
        })
            .write();
    });
}
exports.joinGame = joinGame;
// make Move
function makeMove(inputMakeMove) {
    return __awaiter(this, void 0, void 0, function* () {
        const gameId = _.get(inputMakeMove, 'gameId');
        const playerId = _.get(inputMakeMove, 'playerId');
        const field = _.get(inputMakeMove, 'field');
        const move = Object.assign(Object.assign({}, inputMakeMove), { timestamp: new Date().toUTCString() });
        db.get('moves')
            .push(move)
            .write();
        const game = db.get('games')
            .find({ id: gameId })
            .value();
        console.log('PlayerId ' + playerId);
        const emptyFields = _.get(game, 'emptyFields');
        if (_.get(game, 'player1Id') === playerId) {
            const playerFields = _.concat(_.get(game, 'player1Fields') || [], field);
            const winner = ticTacToeGame.checkWinner(playerFields);
            let gameAttributes;
            if (winner) {
                gameAttributes = {
                    winnerId: playerId,
                    status: "FINISHED_WIN" /* FINISHED_WIN */,
                    nextTurnPlayerId: null,
                };
            }
            else {
                gameAttributes = {
                    nextTurnPlayerId: _.get(game, 'player2Id'),
                };
            }
            db.get('games')
                .find({ id: gameId })
                .assign(Object.assign({ player1Fields: _.uniq(playerFields), emptyFields: _.difference(emptyFields, [field]) }, gameAttributes)).write();
        }
        if (_.get(game, 'player2Id') === playerId) {
            const playerFields = _.concat(_.get(game, 'player2Fields') || [], field);
            const winner = ticTacToeGame.checkWinner(playerFields);
            let gameAttributes;
            if (winner) {
                gameAttributes = {
                    winnerId: playerId,
                    status: "FINISHED_WIN" /* FINISHED_WIN */,
                    nextTurnPlayerId: null,
                };
            }
            else {
                gameAttributes = {
                    nextTurnPlayerId: _.get(game, 'player1Id'),
                };
            }
            db.get('games')
                .find({ id: gameId })
                .assign(Object.assign({ player2Fields: _.uniq(playerFields), emptyFields: _.difference(emptyFields, [field]) }, gameAttributes)).write();
        }
        return move;
    });
}
exports.makeMove = makeMove;
function getMovesForGame(gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        const moves = db.get('moves')
            .filter({ gameId })
            .value();
        return moves;
    });
}
exports.getMovesForGame = getMovesForGame;


/***/ }),

/***/ "./src/graphql/index.ts":
/*!******************************!*\
  !*** ./src/graphql/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mergeRawSchemas_1 = __webpack_require__(/*! ./utils/mergeRawSchemas */ "./src/graphql/utils/mergeRawSchemas.ts");
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const schemaShards_1 = __webpack_require__(/*! ./schemaShards */ "./src/graphql/schemaShards/index.ts");
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


/***/ }),

/***/ "./src/graphql/schemaShards/games.ts":
/*!*******************************************!*\
  !*** ./src/graphql/schemaShards/games.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const subscriptionManager_1 = __webpack_require__(/*! src/graphql/subscriptionManager */ "./src/graphql/subscriptionManager.ts");
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
        FINISHED_TIE
        FINISHED_WIN
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
        nextTurnPlayerId: ID
        winnerId: ID
        Player1: PublicUser
        Player2: PublicUser
        NextTurnPlayer: PublicUser
        Winner: PublicUser
        status: GameStatus
        type: GameType
        Moves: [Move]
        player1Fields: [Int]
        player2Fields: [Int]
        emptyFields: [Int]
        timestamp: String
    }

    type GameResult {
        id: ID
        player1Id: ID
        player2Id: ID
        status: GameStatus
        player1Fields: [Int]
        player2Fields: [Int]
        emptyFields: [Int]
    }

`;
exports.default = {
    resolvers: {
        Query: {
            // get games
            getGames: () => __awaiter(void 0, void 0, void 0, function* () { return yield ticTAcToeGameService.getGames(); }),
            // get game by ID
            game: (root, { id }) => __awaiter(void 0, void 0, void 0, function* () { return yield ticTAcToeGameService.getGameById(id); }),
        },
        Mutation: {
            // create a game
            createGame: (root, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
                let game = yield ticTAcToeGameService.createGame(input);
                if (game.type === "SINGLEPLAYER" /* SINGLEPLAYER */) {
                    const user = yield userService.createAIUser();
                    game = yield ticTAcToeGameService.joinGame({
                        gameId: game.id,
                        player2Id: user.id,
                    });
                }
                return game;
            }),
            // join game
            joinGame: (root, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
                const game = yield ticTAcToeGameService.joinGame(input);
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
            Player1: (game) => __awaiter(void 0, void 0, void 0, function* () { return yield userService.getPublicUser(game.player1Id); }),
            Player2: (game) => __awaiter(void 0, void 0, void 0, function* () { return yield userService.getPublicUser(game.player2Id); }),
            Moves: (game) => __awaiter(void 0, void 0, void 0, function* () { return yield ticTAcToeGameService.getMovesForGames(game.id); }),
        },
    },
    typeDefs: [typeDefs],
};


/***/ }),

/***/ "./src/graphql/schemaShards/index.ts":
/*!*******************************************!*\
  !*** ./src/graphql/schemaShards/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file merges all of the schemas that belong to different parts of the shards
 */
const games_1 = __webpack_require__(/*! src/graphql/schemaShards/games */ "./src/graphql/schemaShards/games.ts");
const moves_1 = __webpack_require__(/*! src/graphql/schemaShards/moves */ "./src/graphql/schemaShards/moves.ts");
const users_1 = __webpack_require__(/*! src/graphql/schemaShards/users */ "./src/graphql/schemaShards/users.ts");
const mergeRawSchemas_1 = __webpack_require__(/*! src/graphql/utils/mergeRawSchemas */ "./src/graphql/utils/mergeRawSchemas.ts");
exports.default = mergeRawSchemas_1.mergeRawSchemas(games_1.default, users_1.default, moves_1.default);


/***/ }),

/***/ "./src/graphql/schemaShards/moves.ts":
/*!*******************************************!*\
  !*** ./src/graphql/schemaShards/moves.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __webpack_require__(/*! lodash */ "lodash");
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const subscriptionManager_1 = __webpack_require__(/*! src/graphql/subscriptionManager */ "./src/graphql/subscriptionManager.ts");
const auth_1 = __webpack_require__(/*! src/auth */ "./src/auth/index.ts");
const services_1 = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
const ticTacToeGameService = new services_1.TicTacToeGameService();
const typeDefs = apollo_server_1.gql `
    extend type Mutation {
        " create a new post "
        makeMove(input: InputMakeMove!): Move
    }

    " input to create a move "
    input InputMakeMove {
        gameId: ID
        playerId: ID
        field: Int
    }

    type Move {
        id: ID
        gameId: ID
        playerId: ID
        field: Int
        Player: PublicUser
        timestamp: String
    }
`;
exports.default = {
    resolvers: {
        Mutation: {
            // create a post
            makeMove: (root, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
                // get the user from the context
                yield auth_1.authenticateContext(context);
                // publish the post to the subscribers
                let game = yield ticTacToeGameService.getGameById(input.gameId);
                if (game.status !== "INPLAY" /* INPLAY */ || !_.includes(game.emptyFields, input.field)) {
                    throw new Error('You cannot play that field.');
                }
                if (game.nextTurnPlayerId !== input.playerId) {
                    throw new Error('This is not your move.');
                }
                // create a new post in the database
                const move = yield ticTacToeGameService.makeMove(input);
                subscriptionManager_1.pubsub.publish('liveResult', {
                    liveResult: game,
                });
                if (game.status !== "INPLAY" /* INPLAY */ && game.type !== "SINGLEPLAYER" /* SINGLEPLAYER */) {
                    const computerInput = {
                        playerId: game.player2Id,
                        gameId: input.gameId,
                    };
                    yield ticTacToeGameService.makeAIMove(computerInput);
                    game = yield ticTacToeGameService.getGameById(input.gameId);
                    subscriptionManager_1.pubsub.publish('liveResult', {
                        liveResult: game,
                    });
                }
                return move;
            }),
        },
    },
    typeDefs: [typeDefs],
};


/***/ }),

/***/ "./src/graphql/schemaShards/users.ts":
/*!*******************************************!*\
  !*** ./src/graphql/schemaShards/users.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const services_1 = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
const userService = new services_1.UserService();
const typeDefs = apollo_server_1.gql `
    enum UserType {
        REAL
        COMPUTER
    }

    extend type Query {
        " login as a user "
        loginUser(input: InputLogin!): User
        " get a user's public data"
        getUser(id: ID!): PublicUser
    }

    extend type Mutation {
        " register a new user "
        registerUser(input: InputRegisterUser!): User
    }

    " used for logging in "
    input InputLogin {
        email: String!
        password: String!
    }

    " used for creating a new user "
    input InputRegisterUser {
        name: String!
        email: String!
        password: String!
    }

    " a type defining a user's public data "
    type PublicUser {
        id: ID
        name: String
        email: String
        type: UserType
    }

    " a type defining a user  "
    type User {
        id: ID
        name: String
        email: String
        token: String
        type: UserType
    }
`;
exports.default = {
    resolvers: {
        Query: {
            // login
            loginUser: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () { return yield userService.getUserByPasswordAndEmail(input); }),
            // get a user
            getUser: (root, { id }) => __awaiter(void 0, void 0, void 0, function* () { return yield userService.getPublicUser(id); }),
        },
        Mutation: {
            // register
            registerUser: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () { return yield userService.registerUser(input); }),
        },
    },
    typeDefs: [typeDefs],
};


/***/ }),

/***/ "./src/graphql/subscriptionManager.ts":
/*!********************************************!*\
  !*** ./src/graphql/subscriptionManager.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const graphql_subscriptions_1 = __webpack_require__(/*! graphql-subscriptions */ "graphql-subscriptions");
// In a production server you might want to have some message broker or pubsub implementation like
// rabbitMQ, redis or kafka logic here
// you can use one of the graphql subscription implementations to do it easily
//
// Redis: https://github.com/davidyaha/graphql-redis-subscriptions
// Kafka: https://github.com/ancashoria/graphql-kafka-subscriptions
// Rabbitmq: https://github.com/cdmbase/graphql-rabbitmq-subscriptions
exports.pubsub = new graphql_subscriptions_1.PubSub();


/***/ }),

/***/ "./src/graphql/utils/mergeRawSchemas.ts":
/*!**********************************************!*\
  !*** ./src/graphql/utils/mergeRawSchemas.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _ = __webpack_require__(/*! lodash */ "lodash");
function withArraysConcatination(objValue, srcValue) {
    // if an array, concat it
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
    // use the normal lodash merge functionality
}
// allows us to merge schemas
exports.mergeRawSchemas = (...schemas) => {
    return _.mergeWith({}, ...schemas, withArraysConcatination);
};


/***/ }),

/***/ "./src/helper/minmax.ts":
/*!******************************!*\
  !*** ./src/helper/minmax.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _ = __webpack_require__(/*! lodash */ "lodash");
const origBoard = Array.from(Array(9).keys()); // an array that keeps track of what's in each square: X, O or nothing
const humanPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];
// defining checkWin function
function checkWin(board, player) {
    const plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []); // finding every index that the player has played
    let gameWon = null;
    for (const [index, win] of winCombos.entries()) { // checking if the game has been won by looping through every winCombos
        if (win.every(elem => plays.indexOf(elem) > -1)) { // has the player played in every spot that counts as a win for that win
            gameWon = { index, player }; // which win combo the player won at & which player had won
            break;
        }
    }
    return gameWon;
}
// defining emptySuares function
function emptySquares() {
    return origBoard.filter(s => typeof s === 'number'); // filter every element in the origBoard to see if the type of element equals number. If yes, we are gonna return it (all the squares that are numbers are empty, the squares with X and O are not empty)
}
// defining bestSpot function
function bestSpot(humanPlayerFields, aiPlayerFields) {
    _.each(humanPlayerFields, (field) => {
        _.set(origBoard, field.toString(), humanPlayer);
    });
    _.each(aiPlayerFields, (field) => {
        _.set(origBoard, field.toString(), aiPlayer);
    });
    const res = minimax(origBoard, aiPlayer); // will always play in the first empty squre
    return res.index;
}
exports.bestSpot = bestSpot;
// defining minimax function
function minimax(newBoard, player) {
    const availSpots = emptySquares(); // defining the indexes of the available spots in the board
    if (checkWin(newBoard, player)) { // checking who wins
        return { score: -10 }; // if O wins we return -10
    }
    if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 }; // if X wins we return 10
    }
    if (availSpots.length === 0) {
        return { score: 0 }; // tie, we return 0
    }
    const moves = []; // collect the scores from each of the empty spots to evaluate them later
    for (let i = 0; i < availSpots.length; i++) {
        const move = {};
        _.set(move, 'index', newBoard[availSpots[i]]); // setting the index number of the empty spot, that was store as a number in the origBoard, to the index property of the move object
        newBoard[availSpots[i]] = player; // setting empty spot on a newBoard to the current player
        if (player === aiPlayer) { // calling the minimax function with the other player in the newly changed newBoard
            const result = minimax(newBoard, humanPlayer);
            _.set(move, 'score', result.score); // store the object result from the minimax function call, that includes a score property, to the score property of the move object
        }
        else {
            const result = minimax(newBoard, aiPlayer);
            _.set(move, 'score', result.score); // if the minimax function does not find a terminal state, it goes level by level (deeper into the game). this recursion happens until it reached out the terminal state and returns a score one level up
        }
        newBoard[availSpots[i]] = _.get(move, 'index'); // minimax resets newBoard to what it was before
        moves.push(move); // pushes the move object to the moves array
    }
    let bestMove; // minimax algorithm evaluates the best move in the moves array
    if (player === aiPlayer) { // choosing the highest score when AI is playing and the lowest score when the human is playing
        let bestScore = -10000; // if the player is AI player, it sets variable bestScore to a very low number
        for (let i = 0; i < moves.length; i++) { // looping through the moves array
            if (moves[i].score > bestScore) { // if a move has a higher score than the bestScore, the algorithm stores that move
                bestScore = moves[i].score;
                bestMove = i; // if there are moves with similar scores, only the first will be stored
            }
        }
    }
    else { // when human Player
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) { // minimax looks for a move with the lowest score to store
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove]; // returning object stored in bestMove
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const graphql_tools_1 = __webpack_require__(/*! graphql-tools */ "graphql-tools");
const index_1 = __webpack_require__(/*! src/auth/index */ "./src/auth/index.ts");
const graphql_1 = __webpack_require__(/*! ./graphql */ "./src/graphql/index.ts");
const port = process.env.PORT || 4000;
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


/***/ }),

/***/ "./src/lib/TicTacToeGame.ts":
/*!**********************************!*\
  !*** ./src/lib/TicTacToeGame.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _ = __webpack_require__(/*! lodash */ "lodash");
const minmax_1 = __webpack_require__(/*! ../helper/minmax */ "./src/helper/minmax.ts");
class TicTacToeGame {
    checkWinner(playerFields) {
        // playerFields
        let winner = false;
        _.each(TicTacToeGame.WINNER_COMBINATIONS, (combination) => {
            const intersection = _.intersection(playerFields, combination);
            if (intersection.length === 3) {
                winner = true;
            }
        });
        return winner;
    }
    checkTie(game) {
        return !this.checkWinner(_.get(game, 'player1Fields')) &&
            !this.checkWinner(_.get(game, 'player2Fields')) &&
            _.isEmpty(_.get(game, 'emptyFields'));
    }
    AIMove(game) {
        const move = minmax_1.bestSpot(game.player1Fields, game.player2Fields);
        return move;
    }
}
exports.TicTacToeGame = TicTacToeGame;
TicTacToeGame.WINNER_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];


/***/ }),

/***/ "./src/lib/index.ts":
/*!**************************!*\
  !*** ./src/lib/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TicTacToeGame_1 = __webpack_require__(/*! ./TicTacToeGame */ "./src/lib/TicTacToeGame.ts");
exports.TicTacToeGame = TicTacToeGame_1.TicTacToeGame;


/***/ }),

/***/ "./src/services/TicTacToeGameService.ts":
/*!**********************************************!*\
  !*** ./src/services/TicTacToeGameService.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __webpack_require__(/*! ../db */ "./src/db/index.ts");
const lib_1 = __webpack_require__(/*! ../lib */ "./src/lib/index.ts");
class TicTacToeGameService {
    getGames() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.getGames();
        });
    }
    getGameById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.getGameById(id);
        });
    }
    createGame(inputCreateGame) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.createGame(inputCreateGame);
        });
    }
    joinGame(inputJoinGame) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.joinGame(inputJoinGame);
        });
    }
    makeMove(inputMakeMove) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.makeMove(inputMakeMove);
        });
    }
    makeAIMove(inputAIMakeMove) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield this.getGameById(inputAIMakeMove.gameId);
            const ticTacToeGame = new lib_1.TicTacToeGame();
            const field = ticTacToeGame.AIMove(game);
            inputAIMakeMove.field = field;
            return db_1.makeMove(inputAIMakeMove);
        });
    }
    getMovesForGames(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const moves = yield db_1.getMovesForGame(gameId);
            console.log('GameId ' + JSON.stringify(gameId));
            console.log('Moves ' + JSON.stringify(moves));
            return moves;
        });
    }
}
exports.TicTacToeGameService = TicTacToeGameService;


/***/ }),

/***/ "./src/services/UserService.ts":
/*!*************************************!*\
  !*** ./src/services/UserService.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __webpack_require__(/*! ../db */ "./src/db/index.ts");
class UserService {
    registerUser(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.registerUser(userInput);
        });
    }
    getPublicUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.getPublicUser(id);
        });
    }
    getUserByPasswordAndEmail(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.getUserByPasswordAndEmail(input);
        });
    }
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.getUserByToken(token);
        });
    }
    createAIUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.createAIUser();
        });
    }
}
exports.UserService = UserService;


/***/ }),

/***/ "./src/services/index.ts":
/*!*******************************!*\
  !*** ./src/services/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TicTacToeGameService_1 = __webpack_require__(/*! ./TicTacToeGameService */ "./src/services/TicTacToeGameService.ts");
exports.TicTacToeGameService = TicTacToeGameService_1.TicTacToeGameService;
var UserService_1 = __webpack_require__(/*! ./UserService */ "./src/services/UserService.ts");
exports.UserService = UserService_1.UserService;


/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "graphql-subscriptions":
/*!****************************************!*\
  !*** external "graphql-subscriptions" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-subscriptions");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "lowdb":
/*!************************!*\
  !*** external "lowdb" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lowdb");

/***/ }),

/***/ "lowdb/adapters/FileSync":
/*!******************************************!*\
  !*** external "lowdb/adapters/FileSync" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lowdb/adapters/FileSync");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map