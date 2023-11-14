const config = require("../config/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.database.DB,
    config.database.USER,
    config.database.PASSWORD,
    {
        host: config.database.HOST,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.direction = require("./direction.model")(sequelize, Sequelize);
db.article = require("./article.model")(sequelize, Sequelize);
db.purchase = require("./purchase.model")(sequelize, Sequelize);
db.carry = require("./carry.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);

///Associations///

db.user.belongsToMany(db.role, {
    through: "role",
    foreignKey: "user_id",
    otherKey: "role_id"
});

db.role.belongsToMany(db.user, {
    through: "role",
    foreignKey: "role_id",
    otherKey: "user_id"
});

db.user.hasOne(db.direction, {
    through: "direction",
    foreignKey: 'user_id'
});

db.purchase.hasOne(db.carry, {
    through: 'carry',
    foreignKey: 'purchase_id'
});

db.article.hasOne(db.carry, {
    through: 'carry',
    foreignKey: 'article_id'
});

db.user.hasOne(db.purchase, {
    through: 'purchase',
    foreignKey: 'id_user'
});

db.ROLES = ["user", "admin"];

module.exports = db;