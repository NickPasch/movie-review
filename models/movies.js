module.exports = function (sequelize, DataTypes) {
  var Movies = sequelize.define("Movies", {
    // Giving the Movies model a name of type STRING
    name: DataTypes.STRING,
  });

  Movies.associate = function (models) {
    // Associating Movies with Reviews
    // When an Movies is deleted, also delete any associated Reviews
    Movies.hasMany(models.Review, {
      onDelete: "cascade",
      // When an Movies is deleted, also delete any associated Reviews
    });
  };

  return Movies;
};
