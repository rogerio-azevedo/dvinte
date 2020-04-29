module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('persons', {
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
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      skin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eye: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hair: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      height: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weight: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      portrait_id: {
        type: Sequelize.INTEGER,
        references: { model: 'portraits', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      alignment_id: {
        type: Sequelize.INTEGER,
        references: { model: 'alignments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      race_id: {
        type: Sequelize.INTEGER,
        references: { model: 'races', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      divinity_id: {
        type: Sequelize.INTEGER,
        references: { model: 'divinities', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
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
    return queryInterface.dropTable('persons')
  },
}
