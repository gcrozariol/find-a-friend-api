import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Fetch pets by city e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by city', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Angel',
        age: 'FULL_GROWN',
        size: 'SMALL',
        energyLevel: 'TWO',
        independencyLevel: 'MEDIUM',
        requiredEnvironment: 'MEDIUM',
        photos: [],
        adoptionRequests: [],
      })

    const pet = await request(app.server).get(`/pets/city/${'Toronto'}`)

    expect(pet.statusCode).toEqual(200)
    expect(pet.body).toEqual([
      expect.objectContaining({
        name: 'Angel',
      }),
    ])
  })
})
