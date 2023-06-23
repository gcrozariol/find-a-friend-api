import { Pet } from '@/interfaces/pet'
import { PetRegisterUseCaseRequest } from '@/use-cases/register-pet'

export interface PetsRepository {
  register(data: PetRegisterUseCaseRequest): Promise<Pet>
}
