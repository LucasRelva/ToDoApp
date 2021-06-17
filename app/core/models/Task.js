const { Model, DataTypes } = require('sequelize')

class Task extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            isActive: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'tasks',
        })
    }
}

module.exports = Task