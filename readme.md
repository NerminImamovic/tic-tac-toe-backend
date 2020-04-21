# Tic Tac Toe Backend

Tic Tac Toe Game on GraphQL, Typescript and AI Minimax Algorithm

### Getting started 

- Install modules `npm install`

- Run in development mode with hot reloading `npm run dev`

- Build `npm run build`

- Generate types and schemas `npm run generate-typedefs`. do this after changes to the api to keep the types in sync.

### Note

Subscription Url for Altair GraphQL client: `ws://localhost:4000/graphql`

We added some basic authentication to it (In heade we send `token: zadsds`. We used lowdb to create a database out of a JSON file.

We used a different technologies such as: 

`apollo` - Provides us with a server implementation for GraphQL, creates a playground where we can play with our queries and gives us different tools.
`graphql-schema-typescript & graphql cli` - These tools will allow us to convert our GraphQL API into TypeScript.
`graphql-tag` - Allows us to embed chunks of GraphQL code inside our TypeScript files.
