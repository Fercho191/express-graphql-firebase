let {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql');

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represent an author",
    fields: () => ({
      id: {type: new GraphQLNonNull(GraphQLString)},
      firstName: {type: new GraphQLNonNull(GraphQLString)},
      lastName: {type: new GraphQLNonNull(GraphQLString)},      
      twitterHandle: {type: GraphQLString}
    })
});

module.exports = AuthorType;