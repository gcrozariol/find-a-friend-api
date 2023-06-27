import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register user e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should register a new user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1 647-675-3313',
        role: 'MEMBER',
        password: '123456',
        address: {
          street: 'Deerford Rd.',
          number: 12,
          city: 'Toronto',
          state: 'ON',
          zipCode: 'M2J 3J3',
          town: 'Don Valley Village',
        },
      })

    expect(response.statusCode).toEqual(201)
  })
})
