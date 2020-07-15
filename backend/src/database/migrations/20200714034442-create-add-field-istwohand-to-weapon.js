module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('weapons', 'is_twohand', {
      type: Sequelize.BOOLEAN,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('weapons', 'is_twohand')
  },
}
