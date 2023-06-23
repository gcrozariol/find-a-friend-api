import { RegisterUseCaseRequest } from '@/use-cases/register-user'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'
import { User } from '@/interfaces/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: RegisterUseCaseRequest) {
    const { name, email, phone, role, password, address } = data

    const user: User = {
      id: randomUUID(),
      name,
      phone,
      email,
      passwordHash: password,
      role: role ?? 'MEMBER',
      address: {
        ...address,
        id: randomUUID(),
        town: address.town ?? null,
      },
    }

    this.items.push(user)

    return user
  }
}
