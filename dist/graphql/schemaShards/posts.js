"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("src/db");
const apollo_server_1 = require("apollo-server");
const subscriptionManager_1 = require("src/graphql/subscriptionManager");
const typeDefs = apollo_server_1.gql `
    extend type Query {
        " get all posts "
        getPosts: [Post]
    }

    extend type Mutation {
        " create a new post "
        createPost(input: InputCreatePost!): Post
    }

    extend type Subscription {
        " called when a new post is created "
        postCreated: Post
    }

    " input to create a new post "
    input InputCreatePost {
        text: String
    }

    type Post {
        id: ID
        userId: ID
        text: String
        user: PublicUser
        timestamp: String
    }
`;
exports.default = {
    resolvers: {
        Query: {
            // get a user
            getPosts: () => db_1.getPosts(),
        },
        Mutation: {},
        Subscription: {
            postCreated: {
                subscribe: (root, args, context) => {
                    return subscriptionManager_1.pubsub.asyncIterator('postCreated');
                },
            },
        },
        Post: {
            user: (post) => db_1.getPublicUser(post.userId),
        },
    },
    typeDefs: [typeDefs],
};
//# sourceMappingURL=posts.js.map