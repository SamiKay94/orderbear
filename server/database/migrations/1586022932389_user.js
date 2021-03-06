'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.uuid('id').primary()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
      table.enu('role', ['ADMIN', 'STATION', 'BEACON', 'CUSTOMER'])
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
