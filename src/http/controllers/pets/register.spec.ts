import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Register pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should register a new pet', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const pet = await request(app.server)
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

    expect(pet.statusCode).toEqual(201)
  })
})
