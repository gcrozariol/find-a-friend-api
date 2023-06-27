import { Pet } from '@/interfaces/pet'
import {
  PetCharacteristics,
  PetsRepository,
} from '@/repositories/pets-repository'

interface FetchPetsByCharacteristicsUseCaseRequest extends PetCharacteristics {}

interface FetchPetsByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: FetchPetsByCharacteristicsUseCaseRequest,
  ): Promise<FetchPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCharacteristics({
      ...data,
    })

    return { pets }
  }
}
