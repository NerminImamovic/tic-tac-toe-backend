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
const _ = require("lodash");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
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
    posts: [],
    users: [],
    games: [],
    moves: [],
}).write();
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
        const user = Object.assign({}, userInput, { id,
            token, password: hash, type: "REAL" /* REAL */ });
        db.get('users')
            .push(user)
            .write();
        return user;
    });
}
exports.registerUser = registerUser;
// get all the posts of a user
function getPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        return db.get('posts')
            .value();
    });
}
exports.getPosts = getPosts;
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
        const game = Object.assign({}, inputCreateGame, { id: uuid_1.v4(), timestamp: new Date().toUTCString() });
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
        const gameId = _.get(inputJoinGame, "gameId");
        const player2Id = _.get(inputJoinGame, "player2Id");
        const game = db.get('games')
            .find({ id: gameId })
            .assign({
            player2Id,
            emptyFields: [...Array(9).keys()].map(i => _.toString(i + 1)),
            status: "INPLAY"
        })
            .write();
        return game;
    });
}
exports.joinGame = joinGame;
// make Move
function makeMove(inputMakeMove) {
    return __awaiter(this, void 0, void 0, function* () {
        const gameId = _.get(inputMakeMove, "gameId");
        const playerId = _.get(inputMakeMove, "playerId");
        const field = _.get(inputMakeMove, "field");
        const move = Object.assign({}, inputMakeMove, { timestamp: new Date().toUTCString() });
        db.get('moves')
            .push(move)
            .write();
        const game = db.get('games')
            .find({ id: gameId })
            .value();
        console.log("PlayerId " + playerId);
        const emptyFields = _.get(game, "emptyFields");
        if (_.get(game, "player1Id") === playerId) {
            const playerFields = _.get(game, "player1Fields") || [];
            db.get('games')
                .find({ id: gameId })
                .assign({
                player1Fields: _.concat(playerFields, field),
                emptyFields: _.difference(emptyFields, [field])
            }).write();
        }
        console.log("Ovdjeeee");
        console.log("Game " + game.id);
        const player2Id = game.player2Id;
        console.log("Player2Id " + player2Id);
        if (_.get(game, "player2Id") === playerId) {
            const playerFields = _.get(game, "player2Fields") || [];
            console.log("Ovdje");
            db.get('games')
                .find({ id: gameId })
                .assign({
                player2Fields: _.concat(playerFields, field),
                emptyFields: _.difference(emptyFields, [field])
            }).write();
        }
        return move;
    });
}
exports.makeMove = makeMove;
//# sourceMappingURL=index.js.map