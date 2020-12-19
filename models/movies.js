module.exports = function (sequelize, DataTypes) {
  var Movies = sequelize.define("Movies", {
    // Giving the Movies model a name of type STRING
    name: DataTypes.STRING,
  });

  Movies.associate = function (models) {
    // Associating Movies with Posts
    // When an Movies is deleted, also delete any associated Posts
    // change hasMany into belongsToMany swithch delete
    Movies.hasMany(models.Post, {
      onDelete: "cascade",
    });
  };

  return Movies;
};
