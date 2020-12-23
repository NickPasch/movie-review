$("#submit-button").on("click", function (event) {
  event.preventDefault();
  module.exports = function (sequelize, DataTypes) {
    var Discussion = sequelize.define("Discussion", {
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
    Discussion.associate = function (models) {
      // We're saying that a Discussion should belong to an User
      // A Discussion can't be created without an User due to the foreign key constraint
      Discussion.belongsTo(models.User, {
        foreignKey: "email",
      });
      Discussion.belongsTo(models.Movies, {
        foreignKey: "name",
      });
    };
    return Discussion;
  };


})