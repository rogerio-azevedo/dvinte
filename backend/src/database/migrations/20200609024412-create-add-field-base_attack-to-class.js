module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('classes', 'attack', {
      type: Sequelize.STRING,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('classes', 'attack')
  },
}
