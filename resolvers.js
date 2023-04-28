const UserData = require("./data/userList.json");
const MoviesList = require("./data/moviesList.json");

const resolvers = {
    Query: {
        users: () => {
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
    }
}

module.exports = resolvers;