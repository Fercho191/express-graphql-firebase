let {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInputObjectType
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

const AuthorInputType = new GraphQLInputObjectType({
  name: "AuthorInput",
  fields: () => ({
    firstName : { type: GraphQLString },
    lastName : { type: GraphQLString },
    twitterHandle : { type: GraphQLString, defaultValue: "" }
  })
})

module.exports = {
  AuthorType,
  AuthorInputType
};