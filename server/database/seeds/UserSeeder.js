'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const DB = use('Database')
const Hash = use('Hash')
const uuidv4 = require("uuid/v4")

class UserSeeder {
  async run() {
    await DB.insert({
      id: uuidv4(),
      username: 'smikxy',
      email: 'samkamara94@gmail.com',
      password: await Hash.make('qwer1234'),
      role: 'ADMIN'
    }).into('users')
  }
}

module.exports = UserSeeder
