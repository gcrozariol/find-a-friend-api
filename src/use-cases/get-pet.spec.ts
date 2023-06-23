import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetByIdUseCase } from './get-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

describe('Get pet by id use case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to fetch a pet', async () => {
    const createdPet = await petsRepository.register({
      userId: 'user-01',
      name: 'Angel',
      age: 'FULL_GROWN',
      size: 'SMALL',
      energyLevel: 'ONE',
      independencyLevel: 'MEDIUM',
      requiredEnvironment: 'MEDIUM',
    })

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Angel')
  })

  it('should return a resource not found error', async () => {
    await expect(() =>
      sut.execute({
        id: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
