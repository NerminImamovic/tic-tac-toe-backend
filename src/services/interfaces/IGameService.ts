interface IGameService {
    getGames(): Promise<Partial<GQL.Game>[]>;
    getGameById(id: String): Promise<Partial<GQL.Game>>;
    createGame(inputCreateGame: GQL.InputCreateGame): Promise<Partial<GQL.Game>>;
    joinGame(inputJoinGame: GQL.InputJoinGame): Promise<Partial<GQL.Game>>;
    makeMove(inputMakeMove: GQL.InputMakeMove): Promise<Partial<GQL.Move>>;
    makeAIMove(inputMakeMove: GQL.InputMakeMove): Promise<Partial<GQL.Move>>;
    getMovesForGames(gameId: string): Promise<Partial<GQL.Move>[]>;
}

export { IGameService };