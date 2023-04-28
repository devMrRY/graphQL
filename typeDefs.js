const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        age: Int!
        nationality: Nationalities!
        favouriteMovies: [Movie!]
    }

    type Movie {
        id: ID!
        name: String!
        description: String
    }

    type Query {
        users: [User!]
        user(id: ID): User
        friends: [User!]
        movies: [Movie!]
    }

    enum Nationalities {
        INDIA
        BRAZIL
        CHINA
        RUSSIA
        CANADA
    }
`;

module.exports = typeDefs;