const User = require("./user");
const Movies = require("./movies");
module.exports = function (sequelize, DataTypes) {
  // We are creating Review model
  var Discussion = sequelize.define("Discussion", {
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {
    //     len: [1],
    //   },
    // },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    }
  });
  // We're saying that a Review should belong to an User
  Discussion.associate = function (models) {
    // A Review can't be created without an User due to the foreign key constraint
    Discussion.belongsTo(models.User, {
      foreignKey: "email",
    });
    Discussion.belongsTo(models.Movies, {
      foreignKey: "name",
    });
  };

  return Discussion;
};