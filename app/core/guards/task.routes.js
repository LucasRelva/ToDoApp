const express = require('express')
const TaskController = require('../controllers/TaskController')

const taskRoutes = express.Router()

taskRoutes.get('/', TaskController.listAll)
taskRoutes.get('/active', TaskController.listActive)
taskRoutes.get('/completed', TaskController.listCompleted)
taskRoutes.delete('/:taskId', TaskController.deleteTask)
taskRoutes.delete('/', TaskController.clearCompleted)
taskRoutes.put('/:taskId', TaskController.updateStatus)
taskRoutes.put('/', TaskController.updateAll)
taskRoutes.post('/', TaskController.addTask)

module.exports = taskRoutes
