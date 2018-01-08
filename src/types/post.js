const _ = require("lodash");

const AuthorModel = require("../models/authorModel");
const { AuthorType } = require("./author");
let {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID
} = require("graphql");

const Author = new AuthorModel();

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This represent a Post",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: function(post) {
        return _.find(Author.getData(), a => a.id == post.authorId);
      }
    }
  })
});

const PostInputType = new GraphQLInputObjectType({
  name: "PostInput",
  fields: () => ({
    title: { type: GraphQLString },
    body: { type: GraphQLString, defaultValue: "" },
    authorId: { type: GraphQLID }
  })
});

module.exports = {
  PostType,
  PostInputType
};
