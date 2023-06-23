import { Pet } from '@/interfaces/pet'
import { PetsRepository } from '../pets-repository'
import { PetRegisterUseCaseRequest } from '@/use-cases/register-pet'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  items: Pet[] = []

  async register(data: PetRegisterUseCaseRequest) {
    const pet: Pet = {
      ...data,
      id: randomUUID(),
      bio: data.bio ?? null,
      photos: data.photos ?? [],
      adoptionRequests: data.adoptionRequests ?? [],
      createdAt: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
