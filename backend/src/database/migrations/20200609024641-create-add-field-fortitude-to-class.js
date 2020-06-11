module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('classes', 'fortitude', {
      type: Sequelize.STRING,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('classes', 'fortitude')
  },
}
