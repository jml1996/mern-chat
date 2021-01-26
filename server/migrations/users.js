// 20210103123609_users.js 

exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
      tbl.increments()
      tbl.string('username', 50).notNullable().unique()
      tbl.string('password', 50).notNullable()
    })
    .createTable('posts', tbl => {
        tbl.increments()
        tbl.string('story', 500)
        tbl.binary('image')
        tbl
        .string("user_id")
        .unsigned()
        .notNullable()
        .references('username')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate("CASCADE")
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('users')
  };