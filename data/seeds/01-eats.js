
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('eats')
    .truncate()
    .then(function () {
      return knex('eats').insert([
        {food_id: 1, food_name: 'Apple'},
        {food_id: 2, food_name: 'Banana'},
        {food_id: 3, food_name: 'Grapes'},
      ]);
    });
};
