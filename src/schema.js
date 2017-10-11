const _ = require('lodash');

const Authors = require('./data/authors'); // This is to make available authors.json file
const Posts = require('./data/posts'); // This is to make available post.json file

const AuthorType = require('./types/author');
const PostType = require('./types/post');
let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
  GraphQLSchema,
} = require('graphql');

  // This is the Root Query
const QueryRootType = new GraphQLObjectType({
    name: 'QueryRootType',
    description: "Application Schema Query Root",
    fields: () => ({
      authors: {
        type: new GraphQLList(AuthorType),
        description: "List of all Authors",
        resolve: function() {
          return Authors
        }
      },
      posts: {
        type: new GraphQLList(PostType),
        description: "List of all Posts",
        resolve: function() {
          return Posts
        }
      }
    })
  });

  // This is the schema declaration
const AppSchema = new GraphQLSchema({
    query: QueryRootType
    // If you need to create or updata a datasource, 
    // you use mutations. Note:
    // mutations will not be explored in this post.
    // mutation: BlogMutationRootType 
  });

module.exports = AppSchema