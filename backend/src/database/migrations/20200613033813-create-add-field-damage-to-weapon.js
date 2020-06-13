module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('weapons', 'damage', {
      type: Sequelize.INTEGER,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('weapons', 'damage')
  },
}
