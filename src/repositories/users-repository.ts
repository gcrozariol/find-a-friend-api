import { User } from '@/interfaces/user'
import { RegisterUseCaseRequest } from '@/use-cases/register'

export interface UsersRepository {
  create(user: RegisterUseCaseRequest): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
