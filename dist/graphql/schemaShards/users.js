"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const services_1 = require("../../services");
const userService = new services_1.UserService();
const typeDefs = apollo_server_1.gql `
    enum UserType {
        REAL
        COMPUTER
    }

    extend type Query {
        " login as a user "
        loginUser(input: InputLogin!): User
        " get a user's public data"
        getUser(id: ID!): PublicUser
    }

    extend type Mutation {
        " register a new user "
        registerUser(input: InputRegisterUser!): User
    }

    " used for logging in "
    input InputLogin {
        email: String!
        password: String!
    }

    " used for creating a new user "
    input InputRegisterUser {
        name: String!
        email: String!
        password: String!
    }

    " a type defining a user's public data "
    type PublicUser {
        id: ID
        name: String
        email: String
        type: UserType
    }

    " a type defining a user  "
    type User {
        id: ID
        name: String
        email: String
        token: String
        type: UserType
    }
`;
exports.default = {
    resolvers: {
        Query: {
            // login
            loginUser: (root, { input }) => userService.getUserByPasswordAndEmail(input),
            // get a user
            getUser: (root, { id }) => userService.getPublicUser(id),
        },
        Mutation: {
            // register
            registerUser: (root, { input }) => userService.registerUser(input),
        },
    },
    typeDefs: [typeDefs],
};
//# sourceMappingURL=users.js.map