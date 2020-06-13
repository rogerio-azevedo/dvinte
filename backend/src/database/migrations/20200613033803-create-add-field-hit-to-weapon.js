module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('weapons', 'hit', {
      type: Sequelize.INTEGER,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('weapons', 'hit')
  },
}
