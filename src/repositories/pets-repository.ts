import { Pet } from '@/interfaces/pet'
import { PetRegisterUseCaseRequest } from '@/use-cases/register-pet'

export interface PetCharacteristics {
  age: 'NEWBORN' | 'JUNIOR' | 'TEEN' | 'FULL_GROWN'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energyLevel: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  independencyLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  requiredEnvironment: 'SMALL' | 'MEDIUM' | 'LARGE'
}

export interface PetsRepository {
  register(data: PetRegisterUseCaseRequest): Promise<Pet>
  findManyByCharacteristics(characteristics: PetCharacteristics): Promise<Pet[]>
  getPetById(id: string): Promise<Pet | null>
}
