module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('classes', 'will', {
      type: Sequelize.STRING,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('classes', 'will')
  },
}
