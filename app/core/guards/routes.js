const express = require('express')
const taskRoutes = require('./task.routes')

const routes = express.Router()

//routes.use(express.static('app/views'))

// Task routes
routes.use('/', taskRoutes)

module.exports = routes