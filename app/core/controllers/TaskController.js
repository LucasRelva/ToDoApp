const { findByPk } = require('../models/Task')
const Task = require('../models/Task')

module.exports = {
    async listAll(req, res) {
        const tasks = await Task.findAll()

        if (!tasks) return res.status(204).json({ error: 'No tasks' })

        return res.json(tasks)
    },

    async listActive(req, res) {
        const { count, rows } = await Task.findAndCountAll({
            atributtes: ['name', 'id'],
            where: {
                isActive: true
            }
        })

        if (!rows) return res.status(204).json({ error: 'No active tasks' })

        return res.json({ "count": count, "rows": rows })
    },

    async listCompleted(req, res) {
        const completedTasks = await Task.findAll({
            atributtes: ['name', 'id'],
            where: {
                isActive: false
            }
        })

        if (!completedTasks) return res.status(204).json({ error: 'No completed tasks' })

        return res.json(completedTasks)
    },

    async deleteTask(req, res) {
        const { taskId } = req.params

        const task = await Task.findByPk(taskId)

        if (!task) return res.status(204).json({ error: 'No task was found with the id: ' + taskId })

        await Task.destroy({
            where: {
                id: taskId
            }
        })

        return res.json(task)
    },

    async clearCompleted(req, res) {
        const tasks = await Task.destroy({
            where: {
                isActive: false
            }
        })

        if (tasks == 0) return res.status(304).json({ error: 'No task was deleted' })

        return res.json(tasks)
    },

    async updateStatus(req, res) {
        const { taskId } = req.params

        const task = await Task.findByPk(taskId)

        if (!task) return res.status(204).json({ error: 'No task was found with the id: ' + taskId })

        task.isActive == true ? await Task.update({ isActive: false }, { where: { id: taskId } }) :
            await Task.update({ isActive: true }, { where: { id: taskId } })

        return res.json(task)
    },

    async updateAll(req, res) {
        const tasks = await Task.findOne({
            where: {
                isActive: true
            }
        })

        if (tasks == null) {
            await Task.update({ isActive: true }, {
                where: {
                    isActive: false
                }
            })
        } else {
            await Task.update({ isActive: false }, {
                where: {
                    isActive: true
                }
            })
        }

        return res.json(tasks)
    },

    async addTask(req, res) {
        const { name } = req.body

        const task = await Task.create({ name, isActive: true })

        if (!task) return res.status(500).json({ error: 'Task was not created properly' })

        return res.json(task)
    },

    async checkCompleted(req, res) {
        const task = await Task.findOne({
            where: {
                isActive: false
            }
        })

        if (task) {
            return res.json({ check: true })
        }
        return res.json({ check: false })
    },

    async updateName(req, res) {
        const { taskId } = req.params
        const { name } = req.body

        const task = await Task.findByPk(taskId)

        if (!task) return res.status(204).json({ error: 'No task was found with the id: ' + taskId })

        await Task.update({ name: name }, {
            where: {
                id: taskId
            }
        })

        return res.json(task)
    }
}