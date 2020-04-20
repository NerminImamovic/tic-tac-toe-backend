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
const db_1 = require("../db");
class UserService {
    registerUser(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.registerUser(userInput);
        });
    }
    getPublicUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.getPublicUser(id);
        });
    }
    getUserByPasswordAndEmail(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.getUserByPasswordAndEmail(input);
        });
    }
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.getUserByToken(token);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map