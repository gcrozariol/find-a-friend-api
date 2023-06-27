import { app } from '@/app'
import request from 'supertest'
import { expect, afterAll, beforeAll, describe, it } from 'vitest'

describe('Refresh token e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await request(app.server)
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
