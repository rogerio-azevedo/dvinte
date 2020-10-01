module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('character_tokens', 'is_monster', {
      type: Sequelize.BOOLEAN,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('character_tokens', 'is_monster')
  },
}
