const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;
const _ = require("lodash");
//dome data
const books = [
  { name: "name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "name of the wind2", genre: "Fantasy2", id: "2", authorId: "2" },
  { name: "name of the wind3", genre: "Fantasy3", id: "3", authorId: "3" },
];
const authors = [
  { name: "Ganar harik", age: "22", id: "1" },
  { name: "Keplor hoti", age: "23", id: "2" },
  { name: "Marina jugar", age: "28", id: "3" },
];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log("parent", parent);

        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(args);
        return _.find(authors, { id: args.id });
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});