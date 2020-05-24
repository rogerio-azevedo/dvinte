module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('armors', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      bonus: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dexterity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      penalty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      magic: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      displacement: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      special: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('armors')
  },
}
