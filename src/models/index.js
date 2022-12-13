const { Sequelize } = require('sequelize')
const { makeFood } = require('./user.model')
const { makeClothes } = require('./clothes.model')

const DATABASE_URL =
    process.env.NODE_ENV === 'test'
        ? 'sqlite::memory:'
        : process.env.DATABASE_URL

const CONNECTION_OPTIONS =
    process.env.NODE_ENV === 'test'
        ? {}
        : {
              ssl: {
                  require: true,
                  rejectUnauthorized: false,
              },
          }
// console.log('\n\nMARKER\n\n', DATABASE_URL)
const sequelize = new Sequelize(DATABASE_URL, CONNECTION_OPTIONS)

const Food = makeFood(sequelize)
const Clothes = makeClothes(sequelize)

module.exports = {
    sequelize,
    Food,
    Clothes,
}
