interface IGame {
    checkTie(game: GQL.Game): boolean;
    checkWinner(playerFields: number[]): boolean;
    AIMove(game: GQL.Game): number;
}

export { IGame };