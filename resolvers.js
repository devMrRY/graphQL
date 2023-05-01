const UserData = require("./data/userList.json");
const MoviesList = require("./data/moviesList.json");

/*
    parent contains object return by upper query in sequence
    args all the arguments
    context contains object provided in appolo server instance
    info consists of graphQL query details
*/
const resolvers = {
    Query: {
        users: (parent, args, context, info) => {
            return UserData
        },
        user: (_, args) => {
            return UserData.find(user => user.id == args.id)
        },
        movies: () => {
            return MoviesList
        }
    },
    User: {
        favouriteMovies: () => {
            return MoviesList.filter(movie => movie.id == 1)
        }
    },
    Mutation: {
        createUser(_, args) {
            let id = UserData.length + 1;
            let userData = {
                id,
                ...args.input
            }
            UserData.push(userData)
            return userData;
        }
    }
}

module.exports = resolvers;