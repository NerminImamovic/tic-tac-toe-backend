import * as _ from 'lodash';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { v4 as createUUID } from 'uuid';

import { IGame, TicTacToeGame } from '../lib';

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

const ticTacToeGame: IGame = new TicTacToeGame();

// get a user's public data by it's id.
export async function getPublicUser(id: string): Promise<GQL.PublicUser> {
  const user = db.get('users')
        .find({ id })
        .value();
  return user;
}

// gets a user by it's password and email.
export async function getUserByPasswordAndEmail(input: GQL.InputLogin): Promise<GQL.User> {
  const { password, email } = input;
  const hash = bcrypt.hashSync(password, hashSalt);
  const user = db.get('users')
        .find({ email, password: hash })
        .value();
  return user;
}

// get a user by it's token
export async function getUserByToken(token: string): Promise<GQL.User> {
  const user = db.get('users')
        .find({ token })
        .value();
  return user;
}

export async function registerUser(userInput: GQL.InputLogin): Promise<GQL.User> {
  const { email, password } = userInput;
  const existingUser = db
        .get('users')
        .find({ email })
        .value();

  if (existingUser) {
    throw new Error('user already exist');
  }

  const id = createUUID();
  const hash = bcrypt.hashSync(password, hashSalt);
  const token = jsonwebtoken.sign(
        { id },
        jwtSecret,
    );

  const user = {
    ...userInput,
    id,
    token,
    password: hash,
    type: GQL.UserType.REAL,
  };

  db.get('users')
        .push(user)
        .write();
  return user;
}

export async function createAIUser(): Promise<GQL.PublicUser> {

  const user = {
    id: createUUID(),
    name: 'COMPUTER',
    type: GQL.UserType.COMPUTER,
  };

  db.get('users')
        .push(user)
        .write();

  return user;
}

// get all games
export async function getGames(): Promise<GQL.Game[]> {
  return db.get('games')
        .value();
}

// get a game by Id
export async function getGameById(id: string): Promise<GQL.Game> {
  const game = db.get('games')
        .find({ id })
        .value();
  return game;
}

// create a new game
export async function createGame(
  inputCreateGame: GQL.InputCreateGame,
): Promise<Partial<GQL.Game>> {

  const game = {
    ...inputCreateGame,
    id: createUUID(),
    timestamp: new Date().toUTCString(),
    status: GQL.GameStatus.NOTSTARTED,
    type: inputCreateGame.gameType,
  };

  db.get('games')
    .push(game)
    .write();

  return game;
}

// join game
export async function joinGame(
  inputJoinGame: GQL.InputJoinGame,
): Promise<Partial<GQL.Game>> {

  const gameId: string = _.get(inputJoinGame, 'gameId');
  const player2Id: string = _.get(inputJoinGame, 'player2Id');

  const game: Partial<GQL.Game> = await getGameById(gameId);

  return db.get('games')
    .find({ id: gameId })
    .assign(
    {
      nextTurnPlayerId: _.get(game, 'player1Id'),
      player2Id,
      emptyFields: [...Array(9).keys()].map(i => i),
      status: GQL.GameStatus.INPLAY,
    },
    )
    .write();
}

// make Move
export async function makeMove(
  inputMakeMove: GQL.InputMakeMove,
): Promise<Partial<GQL.Move>> {

  const gameId: string = _.get(inputMakeMove, 'gameId');
  const playerId: string = _.get(inputMakeMove, 'playerId');
  const field: number = _.get(inputMakeMove, 'field');

  const move: GQL.Move = {
    id: createUUID(),
    ...inputMakeMove,
    timestamp: new Date().toUTCString(),
  };

  db.get('moves')
        .push(move)
        .write();

  const game: Partial<GQL.Game> = db.get('games')
    .find({ id: gameId })
    .value();

  const emptyFields: number[] = _.get(game, 'emptyFields');

  if (_.get(game, 'player1Id') === playerId) {
    const playerFields: number[] = _.concat(_.get(game, 'player1Fields') || [], field);

    const winner = ticTacToeGame.checkWinner(playerFields);

    let gameAttributes: any;

    if (winner) {
      gameAttributes = {
        winnerId: playerId,
        status: GQL.GameStatus.FINISHED_WIN,
        nextTurnPlayerId: null,
      };
    } else {
      gameAttributes = {
        nextTurnPlayerId: _.get(game, 'player2Id'),
      };
    }

    db.get('games')
    .find({ id: gameId })
    .assign(
      {
        player1Fields: _.uniq(playerFields),
        emptyFields: _.difference(emptyFields, [field]),
        ...gameAttributes,
      },
    ).write();
  }

  if (_.get(game, 'player2Id') === playerId) {
    const playerFields: number[] = _.concat(_.get(game, 'player2Fields') || [], field);

    const winner = ticTacToeGame.checkWinner(playerFields);

    let gameAttributes: any;

    if (winner) {
      gameAttributes = {
        winnerId: playerId,
        status: GQL.GameStatus.FINISHED_WIN,
        nextTurnPlayerId: null,
      };
    } else {
      gameAttributes = {
        nextTurnPlayerId: _.get(game, 'player1Id'),
      };
    }

    db.get('games')
    .find({ id: gameId })
    .assign(
      {
        player2Fields: _.uniq(playerFields),
        emptyFields: _.difference(emptyFields, [field]),
        ...gameAttributes,
      },
    ).write();
  }

  return move;
}

export async function getMovesForGame(gameId: string): Promise<Partial<GQL.Move[]>> {

  const moves = db.get('moves')
    .filter({ gameId })
    .value();

  return moves;

}
