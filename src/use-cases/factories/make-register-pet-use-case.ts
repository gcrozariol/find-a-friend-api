import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUserUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new RegisterPetUseCase(petsRepository)

  return useCase
}
