import { PetRegisterUseCaseRequest } from '@/use-cases/register-pet'
import { PetCharacteristics, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async register(data: PetRegisterUseCaseRequest) {
    const pet = prisma.pet.create({ data })

    return pet
  }

  async findManyByCharacteristics({
    age,
    size,
    energyLevel,
    independencyLevel,
    requiredEnvironment,
  }: PetCharacteristics) {
    const pets = prisma.pet.findMany({
      where: {
        age,
        size,
        energyLevel,
        independencyLevel,
        requiredEnvironment,
      },
    })

    return pets
  }

  async getPetById(id: string) {
    const pet = prisma.pet.findFirst({
      where: {
        id,
      },
    })

    return pet
  }
}
