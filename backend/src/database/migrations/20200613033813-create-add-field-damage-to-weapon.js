module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('weapons', 'damage', {
      type: Sequelize.STRING,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('weapons', 'damage')
  },
}
