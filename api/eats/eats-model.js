const db = require('../../data/dbConfig.js')

function getAll() {
  return db('eats')
}

function getById(food_id) {
  return db('eats').where('food_id', food_id).first()
}

async function insert(food) {
  const [food_id] = await db("eats").insert(food)
  return getById(food_id)
}

async function update(food_id, changes) {
  return null
}

function remove(food_id) {
  return null
}

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove,
}