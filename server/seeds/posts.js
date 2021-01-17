exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('posts').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('posts').insert([
          {id: 1, user_id: "William", story: 'Paris is the third best city i ever visited', image: 'https://images.unsplash.com/photo-1609971757431-439cf7b4141b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'},
          {id: 2, user_id: "Marcos", story: 'Took me 7 hours to get this picture right', image: 'https://images.unsplash.com/photo-1609937267533-54a79a720c74?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'},
          {id: 3, user_id: "Josh", story: 'Afraid of heights yet I still climbed it', image: 'https://images.unsplash.com/photo-1610014148783-eb4b1b168bfe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'},
          {id: 4, user_id: "Mike", story: 'i hate snow, its rough, course, and gets everywhere', image: 'https://images.unsplash.com/photo-1609972581660-cd7936a50cf8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80'},
          {id: 5, user_id: "Patrick", story: 'beautiful ridge in an unknown area', image: 'https://images.unsplash.com/photo-1609986118177-5992f3044684?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'}
        ]);
      });
  };