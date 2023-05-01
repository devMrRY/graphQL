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
        users: UsersResult!
        user(id: ID!): User
        userByName(name: String!): [User!]
        friends: [User!]
        movies: [Movie!]
    }

    input createUserInput {
        name: String!
        age: Int = 18
        nationality: Nationalities = INDIA
    }

    type Mutation {
        createUser(input: createUserInput!): User!
    }

    enum Nationalities {
        INDIA
        BRAZIL
        CHINA
        RUSSIA
        CANADA
    }

    type UserSuccessResult {
        users: [User!]
    }

    type UserError {
        message: String!
    }

    union UsersResult = UserSuccessResult | UserError
`;

module.exports = typeDefs;