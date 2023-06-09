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
      if (UserData) return { users: UserData };
      return { message: "Custom Error message" };
    },
    user: (_, args) => {
      return UserData.find((user) => user.id == args.id);
    },
    userByName: (_, args) => {
      return UserData.filter((user) =>
        user.name.toLowerCase().includes(args.name.toLowerCase())
      );
    },
    movies: () => {
      return MoviesList;
    },
  },
  User: {
    favouriteMovies: () => {
      return MoviesList.filter((movie) => movie.id == 1);
    },
  },
  Mutation: {
    createUser(_, args) {
      let id = UserData.length + 1;
      let userData = {
        id,
        ...args.input,
      };
      UserData.push(userData);
      return userData;
    },
  },

  UsersResult: {
    __resolveType(obj) {
      if (obj.users) {
        return "UserSuccessResult";
      }
      if (obj.message) {
        return "UserError";
      }
      return null;
    },
  },
};

module.exports = resolvers;
