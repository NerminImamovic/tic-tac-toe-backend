interface IGame {
    checkWinner(playerFields: number[]): boolean;
    AIMove(game: GQL.Game): number;
}

export { IGame };