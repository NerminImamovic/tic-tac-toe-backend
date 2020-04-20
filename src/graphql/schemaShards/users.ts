import { gql } from 'apollo-server';

import { IUserService, UserService } from '../../services';

const userService: IUserService = new UserService();

const typeDefs = gql`
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

export default {
  resolvers: {
    Query: {
      // login
      loginUser: async (root, { input }: GQL.QueryToLoginUserArgs) => await userService.getUserByPasswordAndEmail(input),
      // get a user
      getUser: async (root, { id }:  GQL.QueryToGetUserArgs) => await userService.getPublicUser(id),
    },
    Mutation: {
      // register
      registerUser: async (root, { input }: GQL.MutationToRegisterUserArgs) => await userService.registerUser(input),
    },
  },
  typeDefs: [typeDefs],
};
