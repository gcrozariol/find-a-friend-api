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

  async findManyByCity(city: string): Promise<Pet[]> {
    throw new Error('Method not implemented.')
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
        item.age === age &&
        item.size === size &&
        item.energyLevel === energyLevel &&
        item.independencyLevel === independencyLevel &&
        item.requiredEnvironment === requiredEnvironment,
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
      name,
      age,
      size,
      energyLevel,
      independencyLevel,
      requiredEnvironment,
      id: randomUUID(),
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
