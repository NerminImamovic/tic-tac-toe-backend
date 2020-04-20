import * as _ from 'lodash';

import { IGame } from './interfaces/IGame';

import { bestSpot } from '../helper/minimax';

class TicTacToeGame implements IGame {

  private static WINNER_COMBINATIONS: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2],
  ];

  public checkWinner(playerFields: number[]): boolean {

        // playerFields
    let winner: boolean = false;

    _.each(TicTacToeGame.WINNER_COMBINATIONS, (combination: number[]) => {

      const intersection: number[] = _.intersection(playerFields, combination);

      if (intersection.length === 3) {
        winner = true;
      }

    });

    return winner;
  }

  public checkTie(game: GQL.Game): boolean {

    return !this.checkWinner(_.get(game, 'player1Fields')) &&
            !this.checkWinner(_.get(game, 'player2Fields')) &&
            _.isEmpty(_.get(game, 'emptyFields'));
  }

  public AIMove(game: GQL.Game): number {

    const move: number = bestSpot(game.player1Fields, game.player2Fields);
    return move;
  }

}

export { TicTacToeGame };
