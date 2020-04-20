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
const db_1 = require("src/db");
// handle all of the token magic here
function createContext(token) {
    return {
        token,
    };
}
// create context for requests
function handleGraphQLContext(ctx) {
    const { req, connection } = ctx;
    // we already connected with a subscription
    if (connection) {
        return connection.context;
    }
    // check the request for the token
    const token = req.headers && req.headers.token;
    return createContext(token);
}
exports.handleGraphQLContext = handleGraphQLContext;
// handle authentication for socket connections
function handleGraphQLSubscriptionContext(connectionParams, webSocket) {
    const token = connectionParams.authToken;
    return createContext(token);
}
exports.handleGraphQLSubscriptionContext = handleGraphQLSubscriptionContext;
// check if the user is logged in or whatever you want to do to authenticate the user
function authenticateContext(context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!context.token) {
            // too bad 👎
            throw new Error('user is not logged in');
        }
        const user = yield db_1.getUserByToken(context.token);
        if (!user) {
            // too bad 👎
            throw new Error('invalid token');
        }
        // yay 👍
        return user;
    });
}
exports.authenticateContext = authenticateContext;
//# sourceMappingURL=index.js.map