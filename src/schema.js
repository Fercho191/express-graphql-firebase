const { AuthorType, AuthorInputType } = require("./types/author");
const { PostType, PostInputType } = require("./types/post");

const AuthorModel = require("./models/authorModel");
const PostModel = require("./models/postModel");

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
  GraphQLSchema
} = require("graphql");

const Author = new AuthorModel();
const Post = new PostModel();

// This is the Root Query
const QueryRootType = new GraphQLObjectType({
  name: "QueryRootType",
  description: "Application Schema Query Root",
  fields: () => ({
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all Authors",
      resolve: function() {
        return Author.getData();
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      description: "List of all Posts",
      resolve: function() {
        return Post.getData();
      }
    }
  })
});

const MutationRootType = new GraphQLObjectType({
  name: "MutationRootType",
  description: "Application Schema Mutation Root",
  fields: {
    createPost: {
      type: PostType,
      description: "Create a Post",
      args: {
        post: { type: PostInputType }
      },
      resolve: function(source, args, context, info) {
        return Post.createPost(args.post);
      }
    },
    createAuthor: {
      type: AuthorType,
      description: "Create a author",
      args: {
        author: { type: AuthorInputType }
      },
      resolve: function(source, args, context, info) {
        return Author.createAuthor(args.author);
      }
    },
    UpdateAuthor: {
      type: GraphQLBoolean,
      description: "Update a author",
      args: {
        author: { type: AuthorInputType },
        id: { type: GraphQLID }
      },
      resolve: function(source, args, context, info) {
        let response = Author.updateAuthor(args.author, args.id);
        response.then(data => {
          if (data.val()) return true;
          else return false;
        });
      }
    },
    deleteAuthor: {
      type: GraphQLBoolean,
      description: "Delete a author",
      args: {
        id: { type: GraphQLString, name: "success" }
      },
      resolve: function(source, args, context, info) {
        return Author.deleteAuthor(args.id);
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

module.exports = AppSchema;
