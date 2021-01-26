
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
            {id: 1, username: 'Josh', password: 'test12345'},
            {id: 2, username: 'Mike', password: 'test12345'},
            {id: 3, username: 'William', password: 'test12345'},
            {id: 4, username: 'Marcos', password: 'test12345'},
            {id: 5, username: 'Patrick', password: 'test12345'}
        ]);
      });
  };