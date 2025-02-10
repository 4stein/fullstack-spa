const { Sequelize } = require('sequelize');
const config = require('../config/database.js');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    port: config.development.port,
  }
);

const db = {};

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Post = require('./post')(sequelize, Sequelize.DataTypes);
const Comment = require('./comment')(sequelize, Sequelize.DataTypes);

db.User = User;
db.Post = Post;
db.Comment = Comment;

db.Comment.belongsTo(db.User, { foreignKey: 'userId' });
db.Comment.belongsTo(db.Post, { foreignKey: 'postId' });
db.User.hasMany(db.Comment, { foreignKey: 'userId' });
db.Post.hasMany(db.Comment, { foreignKey: 'postId' });

db.Post.belongsTo(db.User, { foreignKey: 'userId' });
db.User.hasMany(db.Post, { foreignKey: 'userId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
