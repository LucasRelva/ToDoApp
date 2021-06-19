const Task = require('../models/Task')

module.exports = {
    async listAll(req, res) {
        const tasks = await Task.findAll()

        if (!tasks) return res.satatus(204).json({ error: 'No tasks' })

        return res.json(tasks)
    },

    async listActive(req, res) {
        const { count, rows } = await Task.findAndCountAll({
            atributtes: ['name', 'id'],
            where: {
                isActive: true
            }
        })

        if (!rows) return res.satatus(204).json({ error: 'No active tasks' })

        return res.json({ "count": count, "rows": rows })
    },

    async listCompleted(req, res) {
        const completedTasks = await Task.findAll({
            atributtes: ['name', 'id'],
            where: {
                isActive: false
            }
        })

        if (!completedTasks) return res.satatus(204).json({ error: 'No completed tasks' })

        return res.json(completedTasks)
    },

    async deleteTask(req, res) {
        const { taskId } = req.params

        const task = await Task.findByPk(taskId)

        if (!task) return res.satatus(204).json({ error: 'No task was found with the id: ' + taskId })

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

        if (tasks == 0) return res.satatus(304).json({ error: 'No task was deleted' })

        return res.json(tasks)
    },

    async updateStatus(req, res) {
        const { taskId } = req.params

        const task = await Task.findByPk(taskId)

        if (!task) return res.satatus(204).json({ error: 'No task was found with the id: ' + taskId })

        task.isActive == true ? await Task.update({ isActive: false }, { where: { id: taskId } }) :
            await Task.update({ isActive: true }, { where: { id: taskId } })

        return res.json(task)
    },

    async updateAll(req, res) {
        const tasks = await Task.findAll({
            where: {
                isActive: true
            }
        })

        if (!tasks) {
            await Task.update({ isActive: true }, {
                where: {
                    isActive: false
                }
            })
            return
        }

        await Task.update({ isActive: false }, {
            where: {
                isActive: true
            }
        })

        return res.json(tasks)
    },

    async addTask(req, res) {
        const { name } = req.body

        const task = await Task.create({ name, isActive: true })

        if (!task) return res.satatus(500).json({ error: 'Task was not created properly' })

        return res.json(task)
    },

    //----------------- TODO --------------------
    // async updateName(){  }

}