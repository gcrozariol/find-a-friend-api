import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'

let usersRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register pet use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(usersRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Angel',
      age: 'FULL_GROWN',
      size: 'SMALL',
      energyLevel: 'ONE',
      independencyLevel: 'MEDIUM',
      requiredEnvironment: 'MEDIUM',
      userId: 'user-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
