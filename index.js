import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.use('/graphql', graphqlHTTP({ schema: schema, pretty: true, graphiql:true }))
   .listen(3000);

  console.log('GraphQL server running on http://localhost:3000/graphql');
