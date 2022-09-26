'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          description: 'Culinaria Brasileira',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Culinaria Japonesa',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Culinaria Italiana',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {})
  },
}
