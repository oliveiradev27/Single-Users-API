const Sequelize = require('sequelize')
const sequelize = new Sequelize('sql10270362', 'sql10270362', 'ZwlIYPP7My', {
    host : 'sql10.freemysqlhosting.net',
    dialect : 'mysql',
    operatorsAliases: false
})

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    status : {
        type: Sequelize.BOOLEAN
    }
  }, {timestamps : false});

  module.exports = {
      userModel : function (){
        return User
      }
  }