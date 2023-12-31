import { RegisterUseCaseRequest } from '@/use-cases/register-user'
import { UsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async findByCity(city: string) {
    const users = prisma.user.findMany({
      where: {
        address: {
          city,
        },
      },
      include: {
        address: true,
        pets: true,
      },
    })

    return users
  }

  async create(data: RegisterUseCaseRequest) {
    const { address: userAddress, password, ...userData } = data

    const user = await prisma.user.create({
      data: {
        ...userData,
        passwordHash: password,
        address: {
          create: {
            ...userAddress,
          },
        },
      },
      include: {
        address: true,
        pets: true,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        address: true,
        pets: true,
      },
    })

    return user
  }
}
