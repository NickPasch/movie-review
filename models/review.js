const User = require("./user");
const Movies = require("./movies");
module.exports = function (sequelize, DataTypes) {
  // We are creating Review model
  var Review = sequelize.define("Review", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
  });
  // We're saying that a Review should belong to an User
  Review.associate = function (models) {
    // A Review can't be created without an User due to the foreign key constraint
    Review.belongsTo(models.User, {
      foreignKey: "email",
    });
    Review.belongsTo(models.Movies, {
      foreignKey: "name",
    });
  };

  return Review;
};
