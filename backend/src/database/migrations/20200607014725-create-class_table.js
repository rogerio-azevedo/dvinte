module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('class_tables', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      base_attack: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      base_attack2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      base_attack3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      base_attack4: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fortitude: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reflex: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      will: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      special: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      class_id: {
        type: Sequelize.INTEGER,
        references: { model: 'classes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('class_tables')
  },
}
