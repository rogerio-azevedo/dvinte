module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('weapons', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bonus: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      critical: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      range: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      material: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      magic: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      special: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      character_id: {
        type: Sequelize.INTEGER,
        references: { model: 'characters', key: 'id' },
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
    return queryInterface.dropTable('weapons')
  },
}
