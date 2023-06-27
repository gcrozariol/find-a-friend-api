import { Pet } from '@/interfaces/pet'
import { PetCharacteristics, PetsRepository } from '../pets-repository'
import { PetRegisterUseCaseRequest } from '@/use-cases/register-pet'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  items: Pet[] = []

  async getPetById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCharacteristics({
    age,
    size,
    energyLevel,
    independencyLevel,
    requiredEnvironment,
  }: PetCharacteristics) {
    const pets = this.items.filter(
      (item) =>
        (age ? item.age === age : true) &&
        (size ? item.size === size : true) &&
        (energyLevel ? item.energyLevel === energyLevel : true) &&
        (independencyLevel
          ? item.independencyLevel === independencyLevel
          : true) &&
        (requiredEnvironment
          ? item.requiredEnvironment === requiredEnvironment
          : true),
    )

    return pets
  }

  async register({
    name,
    bio,
    age,
    size,
    energyLevel,
    independencyLevel,
    requiredEnvironment,
    photos,
    adoptionRequests,
    userId,
  }: PetRegisterUseCaseRequest) {
    const pet: Pet = {
      id: randomUUID(),
      name,
      age,
      size,
      energyLevel,
      independencyLevel,
      requiredEnvironment,
      bio: bio ?? null,
      photos: photos ?? [],
      adoptionRequests: adoptionRequests ?? [],
      createdAt: new Date(),
      userId,
    }

    this.items.push(pet)

    return pet
  }
}
