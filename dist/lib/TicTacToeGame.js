"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
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
    minimax() {
        throw new Error("Method not implemented.");
    }
}
TicTacToeGame.WINNER_COMBINATIONS = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
];
exports.TicTacToeGame = TicTacToeGame;
//# sourceMappingURL=TicTacToeGame.js.map