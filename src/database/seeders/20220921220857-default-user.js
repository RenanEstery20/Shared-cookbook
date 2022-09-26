const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          email: 'admin@admin.com.br',
          password_hash: await bcrypt.hash('admin', 8),
          status: true,
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'users',
      {
        email: 'admin@admin.com.br',
      },
      {}
    )
  },
}
