module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('classes', 'reflex', {
      type: Sequelize.STRING,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('classes', 'reflex')
  },
}
