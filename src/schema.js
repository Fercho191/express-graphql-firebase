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
  GraphQLInputObjectType,
  GraphQLID,
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

let AuthorInput = new GraphQLInputObjectType({
  name: "AuthorInput",
  fields: {
    firstName : { type: new GraphQLNonNull(GraphQLString) },
    lastName : { type: new GraphQLNonNull(GraphQLString) },
    twitterHandle : { type: GraphQLString, defaultValue: "" }
  }
})

const MutationRootType = new GraphQLObjectType({
  name: 'MutationRootType',
  description: "Application Schema Mutation Root",
  fields: {
    createAuthor: {
      type: AuthorType,
      args: {
          firstName : { type: new GraphQLNonNull(GraphQLString) },
          lastName : { type: new GraphQLNonNull(GraphQLString) },
          twitterHandle : { type: GraphQLString, defaultValue: "" }
      },
      description: "Create a author",
      resolve: function(source, args, context, info){
        console.log(args)
        return args;
      }
    },
    UpdateAuthor: {
      type: AuthorType,
      args: {
          firstName : { type: new GraphQLNonNull(GraphQLString) },
          lastName : { type: new GraphQLNonNull(GraphQLString) },
          twitterHandle : { type: GraphQLString, defaultValue: "" },
          id: { type: GraphQLID}
      },
      description: "Update a author",
      resolve: function(source, args, context, info){
        console.log(args)
        return args;
      }
    }
  }
});
  // This is the schema declaration
const AppSchema = new GraphQLSchema({
    query: QueryRootType,
    mutation: MutationRootType
    // If you need to create or updata a datasource, 
    // you use mutations. Note:
    // mutations will not be explored in this post.
    // mutation: BlogMutationRootType 
  });

module.exports = AppSchema