module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('characters', 'exp', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('characters', 'exp')
  },
}
