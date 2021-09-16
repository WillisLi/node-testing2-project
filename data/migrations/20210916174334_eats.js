exports.up = function (knex) {
    return knex.schema.createTable("eats", table => {
        table.increments('food_id');
        table.string("food_name", 128).unique().notNullable();
    }); 
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("eats");
};
