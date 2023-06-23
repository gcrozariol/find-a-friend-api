import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchPetsByCityUseCase

describe('Fetch pets by city use case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchPetsByCityUseCase(usersRepository)
  })

  it('should be able to fetch pets fitering by city', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      phone: '+1 647-675-3313',
      email: 'johndoe@example.com',
      password: 'password',
      address: {
        street: 'Deerford Rd.',
        number: 12,
        city: 'Toronto',
        state: 'ON',
        zipCode: 'M2J 3J3',
      },
    })

    const petOne = await petsRepository.register({
      userId: user.id,
      name: 'Angel',
      age: 'FULL_GROWN',
      size: 'SMALL',
      energyLevel: 'ONE',
      independencyLevel: 'MEDIUM',
      requiredEnvironment: 'MEDIUM',
    })

    const petTwo = await petsRepository.register({
      userId: user.id,
      name: 'Devil',
      age: 'FULL_GROWN',
      size: 'SMALL',
      energyLevel: 'ONE',
      independencyLevel: 'MEDIUM',
      requiredEnvironment: 'MEDIUM',
    })

    user.pets.push(petOne)
    user.pets.push(petTwo)

    const { pets } = await sut.execute({
      city: 'Toronto',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Angel',
      }),
      expect.objectContaining({
        id: expect.any(String),
        name: 'Devil',
      }),
    ])
  })

  it('should not return pets', async () => {
    const { pets } = await sut.execute({
      city: 'Toronto',
    })

    expect(pets).toHaveLength(0)
  })
})
