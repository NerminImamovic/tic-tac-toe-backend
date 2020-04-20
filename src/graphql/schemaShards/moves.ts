import * as _ from 'lodash';
import { gql } from 'apollo-server';
import { pubsub } from 'src/graphql/subscriptionManager';
import { authenticateContext } from 'src/auth';

import { IGameService, TicTacToeGameService } from '../../services';

const ticTacToeGameService: IGameService = new TicTacToeGameService();

const typeDefs = gql`
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

export default {
  resolvers: {
    Mutation: {
      // create a post
      makeMove:  async (root, { input }: GQL.MutationToMakeMoveArgs, context) => {
        // get the user from the context
        await authenticateContext(context);

        // publish the post to the subscribers
        let game: Partial<GQL.Game> = await ticTacToeGameService.getGameById(input.gameId);

        if (game.status !== GQL.GameStatus.INPLAY || !_.includes(game.emptyFields, input.field)) {
          throw new Error('You cannot play that field.');
        }

        if (game.nextTurnPlayerId !== input.playerId) {
          throw new Error('This is not your move.');
        }

        // create a new post in the database
        const move: Partial<GQL.Move> = await ticTacToeGameService.makeMove(input);

        pubsub.publish('liveResult', {
          liveResult: game,
        });

        if (game.status !== GQL.GameStatus.INPLAY && game.type !== GQL.GameType.SINGLEPLAYER) {

          const computerInput: GQL.InputMakeMove = {
            playerId: game.player2Id,
            gameId: input.gameId,
          };

          await ticTacToeGameService.makeAIMove(computerInput);

          game = await ticTacToeGameService.getGameById(input.gameId);

          pubsub.publish('liveResult', {
            liveResult: game,
          });

        }

        return move;
      },
    },
  },
  typeDefs: [typeDefs],
};
