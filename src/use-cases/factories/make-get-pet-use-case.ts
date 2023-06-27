import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetByIdUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetByIdUseCase(petsRepository)

  return useCase
}
