module.exports = function (sequelize, DataTypes) {
  // We are creating Post model
  var Post = sequelize.define("Post", {
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
  // We're saying that a Post should belong to an Movies
  Post.associate = function (models) {
    // A Post can't be created without an Movies due to the foreign key constraint
    Post.belongsTo(models.Movies, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Post;
};
