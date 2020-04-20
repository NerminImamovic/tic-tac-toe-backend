"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_subscriptions_1 = require("graphql-subscriptions");
// In a production server you might want to have some message broker or pubsub implementation like
// rabbitMQ, redis or kafka logic here
// you can use one of the graphql subscription implementations to do it easily
//
// Redis: https://github.com/davidyaha/graphql-redis-subscriptions
// Kafka: https://github.com/ancashoria/graphql-kafka-subscriptions
// Rabbitmq: https://github.com/cdmbase/graphql-rabbitmq-subscriptions
exports.pubsub = new graphql_subscriptions_1.PubSub();
//# sourceMappingURL=subscriptionManager.js.map