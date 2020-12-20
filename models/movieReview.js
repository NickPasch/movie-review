module.exports = function (sequelize, DataTypes) {
  // Implementation of junction model
  var Movies = sequelize.define("Movies", {
    name: DataTypes.STRING,
  });
  var Review = sequelize.define("Reviews", {
    name: DataTypes.STRING,
  });
  var MoviesReview = sequelize.define("MoviesReview", {
    MovieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie, // 'Movies' would also work
        key: "id",
      },
    },
    ActorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Actor, // 'Actors' would also work
        key: "id",
      },
    },
  });
  Movies.belongsToMany(Review, { through: MoviesReview });
  Review.belongsToMany(Movies, { through: MoviesReview });
};
