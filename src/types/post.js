const _ = require('lodash');

const {Authors} = require('../data/authors');
const {AuthorType} = require('./author');
let {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "This represent a Post",
    fields: () => ({
      id: {type: new GraphQLNonNull(GraphQLString)},
      title: {type: new GraphQLNonNull(GraphQLString)},
      body: {type: GraphQLString},
      author: {
        type: AuthorType,
        resolve: function(post) {
          return _.find(Authors, a => a.id == post.author_id);
        }
      }
    })
});

const PostInputType = new GraphQLInputObjectType({
  name: "PostInput",
  fields: () => ({
    title : { type: GraphQLString },
    body : { type: GraphQLString, defaultValue: "" },
    author_id : { type: GraphQLID}
  })
})

module.exports = {
  PostType,
  PostInputType
};