/*  
    Required modules {express and express-graphql} 
    will be imported along with the schema object
    from the schema.js file in src/schema.js 
*/

const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./src/schema.js");

let port = 3000;
const app = express();
app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    graphiql: true //set to false if you don't want graphiql enabled
  })
);

app.listen(port);
console.log("GraphQL API server running at localhost:" + port);
