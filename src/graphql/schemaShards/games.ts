import {
  IGameService,
  IUserService,
  TicTacToeGameService,
  UserService,
} from '../../services';

import { gql } from 'apollo-server';
import { pubsub } from 'src/graphql/subscriptionManager';
import { authenticateContext } from 'src/auth';

const ticTAcToeGameService: IGameService = new TicTacToeGameService();
const userService: IUserService = new UserService();

const typeDefs = gql`
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

export default {
  resolvers: {
    Query: {
        // get games
      getGames: async () => await ticTAcToeGameService.getGames(),
        // get game by ID
      game: async (root, { id }:  GQL.QueryToGameArgs) => await ticTAcToeGameService.getGameById(id),
    },
    Mutation: {
      // create a game
      createGame:  async (root, { input } : GQL.MutationToCreateGameArgs, context) => {
        let game: Partial<GQL.Game> = await ticTAcToeGameService.createGame(input);

        if (game.type === GQL.GameType.SINGLEPLAYER) {

          const user: Partial<GQL.PublicUser> = await userService.createAIUser();

          game = await ticTAcToeGameService.joinGame({
            gameId: game.id,
            player2Id: user.id,
          });

        }

        return game;
      },
      // join game
      joinGame: async (root, { input } : GQL.MutationToJoinGameArgs, context) => {
        const game: Partial<GQL.Game> = await ticTAcToeGameService.joinGame(input);

        return game;
      },
    },
    Subscription: {
      liveResult: {
        subscribe: (root, args, context) => {
          return pubsub.asyncIterator('liveResult');
        },
      },
    },
    Game: {
      Player1: async (game: any) => await userService.getPublicUser(game.player1Id),
      Player2: async (game: any) => await userService.getPublicUser(game.player2Id),
      Moves: async (game: any) => await ticTAcToeGameService.getMovesForGames(game.id),
    },
  },
  typeDefs: [typeDefs],
};
