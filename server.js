const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => {
    return { globalData: req }
}})

server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`)
});