module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('characters', 'health_now', {
      type: Sequelize.INTEGER,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('characters', 'health_now')
  },
}
