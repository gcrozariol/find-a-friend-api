import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCharacteristicsUseCase } from './fetch-pets-by-characteristics'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCharacteristicsUseCase

describe('Fetch pets by characteristics use case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCharacteristicsUseCase(petsRepository)

    await petsRepository.register({
      userId: 'user-01',
      name: 'Angel',
      age: 'FULL_GROWN',
      size: 'SMALL',
      energyLevel: 'ONE',
      independencyLevel: 'MEDIUM',
      requiredEnvironment: 'MEDIUM',
    })
  })

  it('should be able to fetch pets', async () => {
    await petsRepository.register({
      userId: 'user-01',
      name: 'Devil',
      age: 'FULL_GROWN',
      size: 'SMALL',
      energyLevel: 'ONE',
      independencyLevel: 'MEDIUM',
      requiredEnvironment: 'MEDIUM',
    })

    const { pets } = await sut.execute({
      age: 'FULL_GROWN',
      size: 'SMALL',
      energyLevel: 'ONE',
      independencyLevel: 'MEDIUM',
      requiredEnvironment: 'MEDIUM',
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

  it('should return the pet related to the filter', async () => {
    await petsRepository.register({
      userId: 'user-01',
      name: 'Devil',
      age: 'FULL_GROWN',
      size: 'MEDIUM',
      energyLevel: 'ONE',
      independencyLevel: 'MEDIUM',
      requiredEnvironment: 'MEDIUM',
    })

    const { pets } = await sut.execute({
      age: 'FULL_GROWN',
      size: 'SMALL',
      energyLevel: 'ONE',
      independencyLevel: 'MEDIUM',
      requiredEnvironment: 'MEDIUM',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Angel',
      }),
    ])
  })
})
