const express = require('express')
const taskRoutes = require('./task.routes')

const routes = express.Router()

routes.use(express.static('app/views'))
routes.use('/active', express.static('app/views'))
routes.use('/completed', express.static('app/views'))

// Task routes
routes.use('/task', taskRoutes)

module.exports = routes