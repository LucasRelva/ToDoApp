const Sequelize = require('sequelize');
const dbConfig = require('./database')
const Task = require('../models/Task')

const connection = new Sequelize(dbConfig)

Task.init(connection)

module.exports = connection