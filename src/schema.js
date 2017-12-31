const _ = require('lodash');

const {Authors, createAuthor, deleteAuthor} = require('./data/authors'); // This is to make available authors.json file
const Posts = require('./data/posts'); // This is to make available post.json file

const {AuthorType, AuthorInputType} = require('./types/author');
const PostType = require('./types/post');
let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLBoolean,
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



const MutationRootType = new GraphQLObjectType({
  name: 'MutationRootType',
  description: "Application Schema Mutation Root",
  fields: {
    createAuthor: {
      type: AuthorType,
      description: "Create a author",
      args: {
          author: { type: AuthorInputType }
      },
      resolve: function(source, args, context, info){
        return createAuthor(args.author)
      }
    },
    UpdateAuthor: {
      type: AuthorType,
      description: "Update a author",
      args: {
          author: { type: AuthorInputType },
          id: { type: GraphQLID}
      },
      resolve: function(source, args, context, info){
        args.author.id = args.id
        console.log(args.author)
        return args.author
      }
    },
    deleteAuthor: {
      type: GraphQLBoolean,
      description: "Delete a author",
      args: {
        id: {type:  GraphQLString, name: "success" } 
      },
      resolve: function(source, args, context, info){
        return deleteAuthor(args.id)
      }
    }
  }
});
  // This is the schema declaration
const AppSchema = new GraphQLSchema({
    query: QueryRootType,
    mutation: MutationRootType
    // If you need to create or updata a datasource, 
    // you use mutations.
  });

module.exports = AppSchema