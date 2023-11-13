module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }  
    },
   
    { timestamps: false});
  
    return role;
  };