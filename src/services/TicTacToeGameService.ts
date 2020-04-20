import {
    getGames,
    getGameById,
    createGame,
    joinGame,
    makeMove,
    getMovesForGame,
} from '../db';

import { IGame, TicTacToeGame } from '../lib';
import { IGameService } from './interfaces/IGameService';

class TicTacToeGameService implements IGameService {

  public async getGames(): Promise<Partial<GQL.Game>[]> {
    return getGames();
  }

  public async getGameById(id: string): Promise<Partial<GQL.Game>> {
    return getGameById(id);
  }

  public async createGame(inputCreateGame: GQL.InputCreateGame): Promise<Partial<GQL.Game>> {
    return createGame(inputCreateGame);
  }

  public async joinGame(inputJoinGame: GQL.InputJoinGame): Promise<Partial<GQL.Game>> {
    return joinGame(inputJoinGame);
  }

  public async makeMove(inputMakeMove: GQL.InputMakeMove): Promise<Partial<GQL.Move>> {
    return makeMove(inputMakeMove);
  }

  public async makeAIMove(inputAIMakeMove: GQL.InputMakeMove): Promise<Partial<GQL.Move>> {

    const game: Partial<GQL.Game> = await this.getGameById(inputAIMakeMove.gameId);
    const ticTacToeGame: IGame = new TicTacToeGame();
    const field: number = ticTacToeGame.AIMove(game);

    inputAIMakeMove.field = field;

    return makeMove(inputAIMakeMove);
  }

  public async getMovesForGames(gameId: string): Promise<Partial<GQL.Move>[]> {

    const moves = await getMovesForGame(gameId);
    return moves;
  }

}

export { TicTacToeGameService };
