import { FetchPetsByCityUseCase } from '../fetch-pets-by-city'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeFetchPetByCityUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new FetchPetsByCityUseCase(usersRepository)

  return useCase
}
