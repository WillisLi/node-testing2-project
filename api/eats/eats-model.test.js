const Eats = require('./eats-model')
const db = require('../../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('Eats Model', () => {
  describe('getAll', () => {
    test('returns all eats in the table', async () => {
      const eats = await Eats.getAll()
      expect(eats).toHaveLength(3)
    })
    test('returns eats in the correct shape', async () => {
      const expected = [
        {
          "food_id": 1,
          "food_name": "Apple"
        },
        {
          "food_id": 2,
          "food_name": "Banana"
        },
        {
          "food_id": 3,
          "food_name": "Grapes"
        },
      ]
      expect(await Eats.getAll()).toMatchObject(expected)
    })
  })
  describe('getById', () => {
    test('returns eats with correct properties', async () => {
      const apple = await Eats.getById(1);
      expect(apple).toMatchObject({ food_id: 1, food_name: 'Apple' })
      const banana = await Eats.getById(2)
      expect(banana).toMatchObject({ food_id: 2, food_name: 'Banana' })
    })
  })

  describe('insert', () => {
    test('creates a new eat in the db', async () => {
      await Eats.insert({ food_name: 'Pizza' })
      const eats = await db('eats')
      expect(eats).toHaveLength(4)
    })
    test('resolves to the newly created eat', async () => {
      const inserted = await Eats.insert({ food_name: 'Pizza' })
      expect(inserted).toMatchObject({ food_id: 4, food_name: 'Pizza' })
    })
  })
})

test('the environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})
