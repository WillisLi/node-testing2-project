const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('[GET] /eats', () => {
  let res
  beforeEach(async () => {
    res = await request(server).get('/eats')
  })
  test('responds with a 200 OK', async () => {
    expect(res.status).toBe(200)
  })
  test('responds with all eats', async () => {
    expect(res.body).toHaveLength(3)
    expect(res.body).toMatchObject([
        {food_id: 1, food_name: 'Apple'},
        {food_id: 2, food_name: 'Banana'},
        {food_id: 3, food_name: 'Grapes'},
    ])
  })
})
describe('[POST] /eats', () => {
  test('responds with the new eat', async () => {
    const res = await request(server)
      .post('/eats')
      .send({ food_name: 'Cake' })
    expect(res.body).toMatchObject({ food_id: 4, food_name: 'Cake' })
  }, 600) 
  test('responds with a 422 on missing name', async () => {
    const res = await request(server)
      .post('/eats')
      .send({ food_nam: 'banan' })
    expect(res.status).toBe(422)
  }, 600)
})
 