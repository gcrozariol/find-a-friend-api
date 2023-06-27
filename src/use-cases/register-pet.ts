import { Pet } from '@/interfaces/pet'
import { PetsRepository } from '@/repositories/pets-repository'

export interface PetRegisterUseCaseRequest {
  id?: string
  name: string
  bio?: string | null
  age: 'NEWBORN' | 'JUNIOR' | 'TEEN' | 'FULL_GROWN'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energyLevel: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  independencyLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  requiredEnvironment: 'SMALL' | 'MEDIUM' | 'LARGE'
  photos?: string[]
  adoptionRequests?: string[]
  userId: string
}

interface PetRegisterUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: PetRegisterUseCaseRequest,
  ): Promise<PetRegisterUseCaseResponse> {
    const pet = await this.petsRepository.register(data)

    return { pet }
  }
}
